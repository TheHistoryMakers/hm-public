import { TranscriptTiming } from './transcript-timing';
// import { BiographyCitation } from './biography-citation';
// import { BiographyFavorites } from './biography-favorites';
// import { TextMatch } from './text-match';

export class DetailedStory {
    // Story fields:
    // public storyID: number;
    // public storyOrder: number;
    // public title: string;
    public transcript: string;
    public timingPairs: TranscriptTiming[];
    // public duration: number;
    // public startTime: number;
    // public prevStory: number;
    // public nextStory: number;
    // public tags: string[];

    // public matchTerms: TextMatch[];

    // public makerCategories: string[];
    // public occupations: string[]; // specific, and hence not facetable
    // public occupationTypes: string[]; // job families, i.e., general, and hence facetable
    // public citation: BiographyCitation;
    // public favorites: BiographyFavorites;
}
