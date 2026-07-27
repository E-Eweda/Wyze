import type { SelectionState } from '../types';


export const seedState: SelectionState = {
  quantities: {
    'cam-v4::white': 1,
    'cam-pan-v3::white': 2,
    'sense-motion': 2,
    'sense-hub': 1,
    'microsd-256': 2,
  },
  activeVariant: {
    'cam-v4': 'white',
    'cam-pan-v3': 'white',
    'cam-floodlight-v2': 'white',
    'battery-cam-pro': 'white',
  },
  selectedPlanId: 'cam-unlimited',
  openStep: 'cameras',
};

export function freshSeed(): SelectionState {
  return {
    quantities: { ...seedState.quantities },
    activeVariant: { ...seedState.activeVariant },
    selectedPlanId: seedState.selectedPlanId,
    openStep: seedState.openStep,
  };
}
