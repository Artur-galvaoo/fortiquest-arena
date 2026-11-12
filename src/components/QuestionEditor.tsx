import React, { useState } from 'react';
import { Question, ContentBlock, OptionItem, ExamDomain } from '../types/quiz';
import { EXAM_DOMAINS } from '../utils/domains';
import { parseInlineMarkdown } from '../utils/markdown';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { IconButton } from './ui/IconButton';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Select } from './ui/Select';
import { 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Plus, 
  Image as ImageIcon, 
  Terminal, 
  FileText 
} from 'lucide-react';

interface QuestionEditorProps {
  isOpen: boolean;
  question: Question | null;
  onSave: (question: Question) => Promise<void>;
  onClose: () => void;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
  isOpen,
  question,
  onSave,
  onClose,
}) => {
  if (!isOpen || !question) return null;

  const [docNumber, setDocNumber] = useState<number>(question.docNumber);
  const [domain, setDomain] = useState<ExamDomain>(question.domain || 'deployment_system');
  const [isMultipleChoice, setIsMultipleChoice] = useState<boolean>(question.isMultipleChoice || false);
  const [requiredAnswersCount, setRequiredAnswersCount] = useState<number>(question.requiredAnswersCount || 1);
  const [blocks, setBlocks] = useState<ContentBlock[]>(question.blocks || []);
  const [options, setOptions] = useState<OptionItem[]>(question.options || []);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(question.correctAnswers || []);
  const [explanation, setExplanation] = useState<string>(question.explanation || '');
  const [tags, setTags] = useState<string>((question.tags || []).join(', '));

  // Validation errors (B7)
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Block handlers
  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= blocks.length) return;
    const next = [...blocks];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    setBlocks(next);
  };

  const handleRemoveBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const handleUpdateBlockContent = (index: number, content: string) => {
    const next = [...blocks];
    next[index] = { ...next[index], content };
    setBlocks(next);
  };

  const handleUpdateBlockLabel = (index: number, label: string) => {
    const next = [...blocks];
    next[index] = { ...next[index], label };
    setBlocks(next);
  };

  const handleAddBlock = (type: 'text' | 'terminal' | 'image') => {
    const newBlock: ContentBlock = {
      id: `b-${Date.now()}`,
      type,
      content: type === 'text' ? 'Novo parágrafo...' : type === 'terminal' ? '# comando CLI' : '',
      label: type === 'image' ? 'Exhibit da questão' : undefined,
      pending: type === 'image',
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleBlockImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        const next = [...blocks];
        next[index] = { ...next[index], url: dataUrl, pending: false };
        setBlocks(next);
      }
    };
    reader.readAsDataURL(file);
  };

  // Option handlers
  const handleToggleCorrectOption = (letter: string) => {
    if (isMultipleChoice) {
      if (correctAnswers.includes(letter)) {
        setCorrectAnswers(correctAnswers.filter((l) => l !== letter));
      } else {
        setCorrectAnswers([...correctAnswers, letter]);
      }
    } else {
      setCorrectAnswers([letter]);
    }
  };

  const handleUpdateOptionText = (index: number, text: string) => {
    const next = [...options];
    next[index] = { ...next[index], text };
    setOptions(next);
  };

  const handleRemoveOption = (index: number) => {
    const removedLetter = options[index].letter;
    setOptions(options.filter((_, i) => i !== index));
    setCorrectAnswers(correctAnswers.filter((l) => l !== removedLetter));
  };

  const handleAddOption = () => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const currentLetters = new Set(options.map((o) => o.letter));
    const nextLetter = letters.find((l) => !currentLetters.has(l)) || 'Z';
    setOptions([...options, { id: `opt-${nextLetter}`, letter: nextLetter, text: '' }]);
  };

  // Validation & Save (B7)
  const handleSave = async () => {
    const newErrors: Record<string, string> = {};

    // 1. Enunciado não vazio
    const textBlock = blocks.find((b) => b.type === 'text' && b.content && b.content.trim().length > 0);
    if (!textBlock) {
      newErrors.enunciado = 'O enunciado da questão não pode ficar em branco.';
    }

    // 2. Pelo menos 2 alternativas com texto
    const validOptions = options.filter((o) => o.text.trim().length > 0);
    if (validOptions.length < 2) {
      newErrors.options = 'A questão deve ter pelo menos 2 alternativas preenchidas.';
    }

    // 3. Gabarito com requiredAnswersCount respostas
    const expectedCount = isMultipleChoice ? requiredAnswersCount : 1;
    if (correctAnswers.length !== expectedCount) {
      newErrors.correctAnswers = isMultipleChoice
        ? `Selecione exatamente ${expectedCount} alternativas corretas no gabarito (atualmente ${correctAnswers.length}).`
        : 'Selecione a alternativa correta no gabarito.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const updatedQ: Question = {
      ...question,
      docNumber,
      domain,
      isMultipleChoice,
      requiredAnswersCount: isMultipleChoice ? requiredAnswersCount : 1,
      blocks,
      options,
      correctAnswers,
      explanation,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      isModified: true, // Mark as user modified (B1)
    };

    await onSave(updatedQ);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={question.id ? `Editar Questão #${question.docNumber}` : 'Nova Questão'}
      maxWidth="720px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Metadados Básicos */}
        <div>
          <h3 className="text-[13px] font-semibold text-muted uppercase tracking-wider mb-3">
            Identificação e Classificação
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-muted mb-1">
                Número no Exame
              </label>
              <Input
                type="number"
                value={docNumber}
                onChange={(e) => setDocNumber(parseInt(e.target.value) || 1)}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-muted mb-1">
                Domínio
              </label>
              <Select
                value={domain}
                onChange={(e) => setDomain(e.target.value as ExamDomain)}
              >
                {Object.values(EXAM_DOMAINS).map((d) => (
                  <option key={d.key} value={d.key}>
                    {d.number}. {d.namePt}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-muted mb-1">
                Tags (separadas por vírgula)
              </label>
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Ex.: SD-WAN, GUI, HA"
              />
            </div>
          </div>
        </div>

        {/* Formato de Resposta */}
        <div>
          <h3 className="text-[13px] font-semibold text-muted uppercase tracking-wider mb-3">
            Formato de Resposta
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-muted mb-1">
                Tipo de Escolha
              </label>
              <Select
                value={isMultipleChoice ? 'multi' : 'single'}
                onChange={(e) => {
                  const isMulti = e.target.value === 'multi';
                  setIsMultipleChoice(isMulti);
                  if (!isMulti) {
                    setRequiredAnswersCount(1);
                    if (correctAnswers.length > 1) {
                      setCorrectAnswers([correctAnswers[0]]);
                    }
                  } else {
                    setRequiredAnswersCount(2);
                  }
                }}
              >
                <option value="single">Escolha Única (1 correta)</option>
                <option value="multi">Múltipla Escolha</option>
              </Select>
            </div>

            {isMultipleChoice && (
              <div>
                <label className="block text-[12px] font-medium text-muted mb-1">
                  Quantidade de Respostas
                </label>
                <Select
                  value={requiredAnswersCount}
                  onChange={(e) => setRequiredAnswersCount(parseInt(e.target.value))}
                >
                  <option value={2}>Escolha 2 alternativas</option>
                  <option value={3}>Escolha 3 alternativas</option>
                </Select>
              </div>
            )}
          </div>
        </div>

        {/* Blocos de Conteúdo */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-semibold text-muted uppercase tracking-wider">
              Enunciado e Blocos
            </h3>
            <div className="flex items-center gap-1.5">
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() => handleAddBlock('text')}
                className="gap-1 text-[12px]"
              >
                <FileText className="w-3.5 h-3.5 stroke-[1.75]" />
                Texto
              </Button>
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() => handleAddBlock('terminal')}
                className="gap-1 text-[12px]"
              >
                <Terminal className="w-3.5 h-3.5 stroke-[1.75]" />
                CLI
              </Button>
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() => handleAddBlock('image')}
                className="gap-1 text-[12px]"
              >
                <ImageIcon className="w-3.5 h-3.5 stroke-[1.75]" />
                Imagem
              </Button>
            </div>
          </div>

          {errors.enunciado && (
            <p className="text-[12px] text-danger mb-2 font-medium">
              {errors.enunciado}
            </p>
          )}

          <div className="space-y-3">
            {blocks.map((block, idx) => (
              <div
                key={block.id || idx}
                className="bg-surface border border-border rounded-md p-3.5 shadow-card"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-border text-[12px] text-muted">
                  <span className="font-medium capitalize">
                    {block.type === 'text' ? 'Texto' : block.type === 'terminal' ? 'Console CLI' : 'Imagem Exhibit'}
                  </span>

                  <div className="flex items-center gap-1">
                    <IconButton
                      aria-label="Mover para cima"
                      disabled={idx === 0}
                      onClick={() => handleMoveBlock(idx, 'up')}
                    >
                      <ArrowUp className="w-3.5 h-3.5 stroke-[1.75]" />
                    </IconButton>
                    <IconButton
                      aria-label="Mover para baixo"
                      disabled={idx === blocks.length - 1}
                      onClick={() => handleMoveBlock(idx, 'down')}
                    >
                      <ArrowDown className="w-3.5 h-3.5 stroke-[1.75]" />
                    </IconButton>
                    <IconButton
                      aria-label="Remover bloco"
                      onClick={() => handleRemoveBlock(idx)}
                      className="text-danger hover:bg-danger-soft"
                    >
                      <Trash2 className="w-3.5 h-3.5 stroke-[1.75]" />
                    </IconButton>
                  </div>
                </div>

                {block.type === 'text' && (
                  <Textarea
                    rows={3}
                    value={block.content || ''}
                    onChange={(e) => handleUpdateBlockContent(idx, e.target.value)}
                    placeholder="Enunciado ou texto explicativo..."
                  />
                )}

                {block.type === 'terminal' && (
                  <Textarea
                    rows={4}
                    value={block.content || ''}
                    onChange={(e) => handleUpdateBlockContent(idx, e.target.value)}
                    className="font-mono text-[13px] !bg-term-bg !text-term-text caret-accent"
                    placeholder="# comando FortiOS console..."
                  />
                )}

                {block.type === 'image' && (
                  <div className="space-y-2">
                    <Input
                      value={block.label || ''}
                      onChange={(e) => handleUpdateBlockLabel(idx, e.target.value)}
                      placeholder="Legenda do exhibit (opcional)"
                    />
                    {block.url ? (
                      <div className="relative group p-2 border border-border rounded-sm bg-subtle text-center">
                        <img
                          src={block.url}
                          alt="Exhibit"
                          className="max-h-40 mx-auto object-contain rounded-xs"
                        />
                        <label className="mt-2 inline-block cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleBlockImageUpload(idx, file);
                            }}
                          />
                          <Button variant="secondary" size="sm" type="button" className="pointer-events-none">
                            Substituir imagem
                          </Button>
                        </label>
                      </div>
                    ) : (
                      <div className="p-4 border border-dashed border-border rounded-sm text-center bg-subtle">
                        <p className="text-[12px] text-muted mb-2">Nenhuma imagem anexada</p>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleBlockImageUpload(idx, file);
                            }}
                          />
                          <Button variant="secondary" size="sm" type="button" className="pointer-events-none">
                            Carregar arquivo
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Alternativas e Gabarito */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-[13px] font-semibold text-muted uppercase tracking-wider">
                Alternativas e Gabarito
              </h3>
              <p className="text-[11px] text-faint">
                Clique na letra para marcar/desmarcar como correta (fica verde).
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={handleAddOption}
              className="gap-1 text-[12px]"
            >
              <Plus className="w-3.5 h-3.5 stroke-[1.75]" />
              Nova alternativa
            </Button>
          </div>

          {errors.options && (
            <p className="text-[12px] text-danger mb-2 font-medium">
              {errors.options}
            </p>
          )}
          {errors.correctAnswers && (
            <p className="text-[12px] text-danger mb-2 font-medium">
              {errors.correctAnswers}
            </p>
          )}

          <div className="space-y-2.5">
            {options.map((opt, idx) => {
              const isCorrect = correctAnswers.includes(opt.letter);

              return (
                <div key={opt.id || idx} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleCorrectOption(opt.letter)}
                    className={`w-9 h-9 shrink-0 rounded-sm font-semibold text-[13px] flex items-center justify-center transition-colors cursor-pointer select-none ${
                      isCorrect
                        ? 'bg-success text-on-accent border border-success'
                        : 'bg-subtle text-muted border border-border hover:border-border-strong'
                    }`}
                    title={isCorrect ? 'Alternativa correta (clique para alternar)' : 'Clique para marcar como correta'}
                  >
                    {opt.letter}
                  </button>

                  <Input
                    value={opt.text}
                    onChange={(e) => handleUpdateOptionText(idx, e.target.value)}
                    placeholder={`Texto da alternativa ${opt.letter}...`}
                    className="flex-1"
                  />

                  <IconButton
                    aria-label="Remover alternativa"
                    onClick={() => handleRemoveOption(idx)}
                    disabled={options.length <= 2}
                    className="text-danger hover:bg-danger-soft"
                  >
                    <Trash2 className="w-4 h-4 stroke-[1.75]" />
                  </IconButton>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explicação Técnica com Pré-visualização */}
        <div>
          <h3 className="text-[13px] font-semibold text-muted uppercase tracking-wider mb-2">
            Explicação
          </h3>
          <p className="text-[11px] text-faint mb-2">
            Utilize **Conceito:** no início e - ✅ / - ❌ para as alternativas.
          </p>
          <Textarea
            rows={8}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="**Conceito:** O parâmetro `set status`..."
            className="text-[14px]"
          />

          {explanation.trim().length > 0 && (
            <div className="mt-3 p-3.5 bg-subtle border border-border rounded-md text-[13px] text-muted">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-faint block mb-1.5">
                Pré-visualização renderizada
              </span>
              <div className="whitespace-pre-line leading-relaxed text-text">
                {parseInlineMarkdown(explanation)}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
