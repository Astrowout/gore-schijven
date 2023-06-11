import create from 'zustand';

import { ILoaderStore } from './types';

export default create<ILoaderStore>((set) => ({
	isFeedbackLoading: false,
	isEmailLoading: false,
	isNotionLoading: false,
	setFeedbackLoading: (state) => set({
		isFeedbackLoading: state,
	}),
	setEmailLoading: (state) => set({
		isEmailLoading: state,
	}),
	setNotionLoading: (state) => set({
		isNotionLoading: state,
	}),
}));