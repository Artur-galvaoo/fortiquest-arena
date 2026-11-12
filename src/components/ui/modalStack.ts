// Global modal stack to handle nested Esc key cleanly (Bug B2)
const modalStack: string[] = [];

export function registerModal(id: string) {
  if (!modalStack.includes(id)) {
    modalStack.push(id);
  }
}

export function unregisterModal(id: string) {
  const idx = modalStack.indexOf(id);
  if (idx !== -1) {
    modalStack.splice(idx, 1);
  }
}

export function isTopModal(id: string): boolean {
  return modalStack.length > 0 && modalStack[modalStack.length - 1] === id;
}
