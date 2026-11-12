import React, { useState, useMemo, useRef } from 'react';
import { Question, UserProgressItem, UserStats, UserSettings, ExamDomain } from '../types/quiz';
import { EXAM_DOMAINS } from '../utils/domains';
import { QuestionEditor } from './QuestionEditor';
import { Button } from './ui/Button';
import { IconButton } from './ui/IconButton';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Chip } from './ui/Chip';
import { useToast } from './ui/Toast';
import { exportFullBackup, importFullBackup } from '../utils/storage';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit3, 
  Copy, 
  CheckSquare, 
  Download, 
  Upload 
} from 'lucide-react';

interface BankManagerProps {
  questions: Question[];
  progressMap: Record<string, UserProgressItem>;
  stats: UserStats;
  settings: UserSettings;
  onSaveQuestion: (question: Question) => Promise<void>;
  onDeleteQuestion: (questionId: string) => Promise<void>;
  onResetProgress: () => Promise<void>;
  onRestoreOriginalSeed: () => Promise<void>;
  onReloadAllData: () => Promise<void>;
  onOpenGabarito: (questionIndex: number) => void;
}

export const BankManager: React.FC<BankManagerProps> = ({
  questions,
  progressMap,
  onSaveQuestion,
  onOpenGabarito,
  onReloadAllData,
}) => {
  const { showToast } = useToast();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Menu More dropdown state
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editor Modal state
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    questions.forEach((q) => {
      (q.tags || []).forEach((t) => set.add(t));
    });
    return Array.from(set).sort();
  }, [questions]);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // 1. Search filter (text, options, number, origin)
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const numMatch = q.docNumber.toString().includes(term);
        const textMatch = q.blocks.some(
          (b) => b.content && b.content.toLowerCase().includes(term)
        );
        const optMatch = q.options.some((o) => o.text.toLowerCase().includes(term));
        const originMatch = q.origin && q.origin.toLowerCase().includes(term);
        const tagMatch = (q.tags || []).some((t) => t.toLowerCase().includes(term));

        if (!numMatch && !textMatch && !optMatch && !originMatch && !tagMatch) {
          return false;
        }
      }

      // 2. Domain filter
      if (filterDomain !== 'all' && q.domain !== filterDomain) {
        return false;
      }

      // 3. Tag filter
      if (filterTag !== 'all' && !(q.tags || []).includes(filterTag)) {
        return false;
      }

      // 4. Status / Gabarito / Image filter (B6)
      if (filterStatus === 'with_gabarito') {
        if (!q.correctAnswers || q.correctAnswers.length === 0) return false;
      } else if (filterStatus === 'without_gabarito') {
        if (q.correctAnswers && q.correctAnswers.length > 0) return false;
      } else if (filterStatus === 'missing_image') {
        // Questions that have image blocks with pending/missing URLs
        const imgBlocks = q.blocks.filter((b) => b.type === 'image');
        const hasMissingImg = imgBlocks.length > 0 && imgBlocks.some((b) => !b.url);
        if (!hasMissingImg) return false;
      }

      return true;
    });
  }, [questions, searchTerm, filterDomain, filterTag, filterStatus]);

  // Handlers for New, Edit, Duplicate
  const handleOpenNewQuestion = () => {
    const nextDocNum =
      questions.length > 0
        ? Math.max(...questions.map((q) => q.docNumber || 0)) + 1
        : 1;

    const newQuestionTemplate: Question = {
      id: `q-custom-${Date.now()}`,
      docNumber: nextDocNum,
      origin: 'Questão criada manualmente',
      domain: 'deployment_system',
      blocks: [
        {
          id: `b-${Date.now()}-1`,
          type: 'text',
          content: '',
        },
      ],
      options: [
        { id: 'opt-A', letter: 'A', text: '' },
        { id: 'opt-B', letter: 'B', text: '' },
        { id: 'opt-C', letter: 'C', text: '' },
        { id: 'opt-D', letter: 'D', text: '' },
      ],
      isMultipleChoice: false,
      requiredAnswersCount: 1,
      correctAnswers: [],
      explanation: '',
      tags: [],
      isCustom: true,
      isModified: true,
    };

    setEditingQuestion(newQuestionTemplate);
    setIsEditorOpen(true);
  };

  const handleEditQuestion = (q: Question) => {
    setEditingQuestion(q);
    setIsEditorOpen(true);
  };

  const handleDuplicateQuestion = async (q: Question) => {
    const nextDocNum = Math.max(...questions.map((item) => item.docNumber || 0)) + 1;
    const duplicated: Question = {
      ...q,
      id: `q-dup-${Date.now()}`,
      docNumber: nextDocNum,
      isCustom: true,
      isModified: true,
      blocks: q.blocks.map((b) => ({ ...b, id: `b-${Date.now()}-${Math.random()}` })),
      options: q.options.map((o) => ({ ...o, id: `opt-${Date.now()}-${o.letter}` })),
    };

    await onSaveQuestion(duplicated);
    showToast(`Questão #${q.docNumber} duplicada como #${nextDocNum}!`);
  };

  // Export / Import Backup (B14: use toast)
  const handleExportBackup = async () => {
    try {
      const json = await exportFullBackup();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fortiquest-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setIsMoreMenuOpen(false);
      showToast('Backup exportado com sucesso!');
    } catch {
      showToast('Erro ao exportar backup', 'danger');
    }
  };

  const handleImportFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      await importFullBackup(text);
      await onReloadAllData();
      setIsMoreMenuOpen(false);
      showToast('Backup importado com sucesso!');
    } catch (err: unknown) {
      showToast((err as Error).message || 'Erro ao importar backup', 'danger');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* 2.3 Top Bar: Search Input (flex-1) + 3 Selects + Button primary "Nova questão" + MoreHorizontal */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Search Input */}
        <div className="relative flex-1">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por texto, número ou comando..."
            className="pl-9"
          />
          <Search className="w-4 h-4 text-faint stroke-[1.75] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 3 Selects: Domínio, Tag, Gabarito/Imagem */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <div className="w-36 sm:w-44">
            <Select
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
            >
              <option value="all">Todos os domínios</option>
              {Object.values(EXAM_DOMAINS).map((d) => (
                <option key={d.key} value={d.key}>
                  {d.number}. {d.namePt}
                </option>
              ))}
            </Select>
          </div>

          <div className="w-32 sm:w-36">
            <Select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
            >
              <option value="all">Todas as tags</option>
              {allTags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>

          <div className="w-36 sm:w-40">
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Todos os status</option>
              <option value="with_gabarito">Com gabarito</option>
              <option value="without_gabarito">Sem gabarito</option>
              <option value="missing_image">Sem imagem</option>
            </Select>
          </div>

          <Button
            variant="primary"
            onClick={handleOpenNewQuestion}
            className="gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[1.75]" />
            <span>Nova questão</span>
          </Button>

          {/* MoreHorizontal Menu (Export / Import) */}
          <div className="relative">
            <IconButton
              aria-label="Mais opções"
              tooltip="Exportar / Importar backup"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            >
              <MoreHorizontal className="w-4 h-4 stroke-[1.75]" />
            </IconButton>

            {isMoreMenuOpen && (
              <div className="absolute right-0 top-11 z-30 w-48 bg-surface border border-border rounded-md shadow-pop py-1 text-[13px] text-text">
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="w-full px-3.5 py-2 text-left hover:bg-subtle flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4 text-muted stroke-[1.75]" />
                  <span>Exportar backup</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-3.5 py-2 text-left hover:bg-subtle flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4 text-muted stroke-[1.75]" />
                  <span>Importar backup</span>
                </button>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFileChange}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Counter: "77 questões · 4 filtradas" in 12 muted */}
      <div className="text-[12px] text-muted font-medium">
        <span className="tabular-nums">{questions.length}</span> questões ·{' '}
        <span className="tabular-nums">{filteredQuestions.length}</span> filtradas
      </div>

      {/* Slim 64px Rows List */}
      <div className="space-y-2">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 text-muted text-[14px]">
            Nenhuma questão encontrada para os filtros selecionados.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            // Find text statement
            const statement =
              q.blocks.find((b) => b.type === 'text' && b.content)?.content ||
              'Enunciado não preenchido';

            // Image stats (B6)
            const imgBlocks = q.blocks.filter((b) => b.type === 'image');
            const attachedImages = imgBlocks.filter((b) => Boolean(b.url)).length;
            const totalImages = imgBlocks.length;
            const isMissingImage = totalImages > 0 && attachedImages < totalImages;

            // Progress box
            const progress = progressMap[q.id];
            const box = progress?.box || 1;

            const qIndex = questions.findIndex((item) => item.id === q.id);

            return (
              <div
                key={q.id}
                className="bg-surface border border-border hover:border-border-strong rounded-md p-3.5 sm:px-4 sm:py-3 min-h-[64px] flex items-center justify-between gap-4 transition-colors"
              >
                {/* Number & Enunciado */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <span className="font-mono text-[12px] text-muted shrink-0 w-8">
                    #{q.docNumber}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-text truncate leading-snug">
                      {statement}
                    </p>

                    {/* Chips line */}
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      {q.domain && EXAM_DOMAINS[q.domain] && (
                        <Chip variant="neutral" className="text-[11px] h-[20px]">
                          {EXAM_DOMAINS[q.domain].namePt}
                        </Chip>
                      )}

                      <Chip variant="neutral" className="text-[11px] h-[20px]">
                        Gabarito: {q.correctAnswers?.join(', ') || 'Nenhum'}
                      </Chip>

                      {totalImages > 0 && (
                        <Chip
                          variant={isMissingImage ? 'danger' : 'neutral'}
                          className="text-[11px] h-[20px]"
                        >
                          {attachedImages}/{totalImages} img
                        </Chip>
                      )}

                      <Chip variant="neutral" className="text-[11px] h-[20px]">
                        Caixa {box}
                      </Chip>
                    </div>
                  </div>
                </div>

                {/* Right Action Icons: Editar / Duplicar / Gabarito */}
                <div className="flex items-center gap-1 shrink-0">
                  <IconButton
                    aria-label={`Editar questão #${q.docNumber}`}
                    tooltip="Editar questão"
                    onClick={() => handleEditQuestion(q)}
                  >
                    <Edit3 className="w-4 h-4 stroke-[1.75]" />
                  </IconButton>

                  <IconButton
                    aria-label={`Duplicar questão #${q.docNumber}`}
                    tooltip="Duplicar questão"
                    onClick={() => handleDuplicateQuestion(q)}
                  >
                    <Copy className="w-4 h-4 stroke-[1.75]" />
                  </IconButton>

                  <IconButton
                    aria-label={`Definir gabarito da questão #${q.docNumber}`}
                    tooltip="Definir gabarito"
                    onClick={() => onOpenGabarito(qIndex >= 0 ? qIndex : 0)}
                  >
                    <CheckSquare className="w-4 h-4 stroke-[1.75]" />
                  </IconButton>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Standalone Question Editor Modal */}
      <QuestionEditor
        isOpen={isEditorOpen}
        question={editingQuestion}
        onSave={async (updated) => {
          await onSaveQuestion(updated);
          setIsEditorOpen(false);
          showToast(`Questão #${updated.docNumber} salva com sucesso!`);
        }}
        onClose={() => setIsEditorOpen(false)}
      />
    </div>
  );
};
