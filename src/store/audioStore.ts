import { create } from 'zustand';

export type AudioState = {
  isMuted: boolean;
  toggleMute: () => void;
};

const useAudioStore = create<AudioState>((set) => ({
  isMuted: false,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
}));

export default useAudioStore;
