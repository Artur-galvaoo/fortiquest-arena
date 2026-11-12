import React, { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { Cloud, CloudOff, LogOut, RefreshCw } from 'lucide-react';
import { initCloudSync, signInWithGoogle, signOutCloud, SyncStatus } from '../utils/cloudSync';

interface Props {
  onRemoteData: () => void;
}

const STATUS_LABEL: Record<SyncStatus, string> = {
  'signed-out': 'Entrar com Google para salvar na nuvem',
  syncing: 'Sincronizando...',
  synced: 'Progresso salvo na nuvem',
  error: 'Erro ao sincronizar (salvo só neste navegador)',
};

export function CloudSyncButton({ onRemoteData }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<SyncStatus>('signed-out');
  const [busy, setBusy] = useState(false);

  useEffect(
    () =>
      initCloudSync(onRemoteData, (u, s) => {
        setUser(u);
        setStatus(s);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const base =
    'fixed bottom-4 left-4 z-30 flex items-center gap-2 rounded-full border border-border bg-surface/90 backdrop-blur px-3 py-2 text-[12px] text-muted shadow-card';

  if (!user) {
    return (
      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          try {
            await signInWithGoogle();
          } catch (e) {
            console.error(e);
            alert('Não foi possível entrar com Google. Tente novamente.');
          } finally {
            setBusy(false);
          }
        }}
        className={`${base} hover:text-text cursor-pointer`}
        title={STATUS_LABEL['signed-out']}
      >
        <CloudOff className="w-4 h-4" />
        <span>Entrar com Google</span>
      </button>
    );
  }

  const Icon = status === 'syncing' ? RefreshCw : status === 'error' ? CloudOff : Cloud;
  return (
    <div className={base} title={`${STATUS_LABEL[status]} — ${user.email ?? ''}`}>
      <Icon className={`w-4 h-4 ${status === 'syncing' ? 'animate-spin' : ''} ${status === 'error' ? 'text-danger' : status === 'synced' ? 'text-success' : ''}`} />
      <span className="hidden sm:inline">{status === 'synced' ? 'Salvo na nuvem' : STATUS_LABEL[status]}</span>
      <button
        type="button"
        onClick={() => signOutCloud()}
        className="ml-1 hover:text-text cursor-pointer"
        title="Sair da conta Google"
        aria-label="Sair da conta Google"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}
