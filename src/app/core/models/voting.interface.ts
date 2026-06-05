export interface VotingOption {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  impact: string;
  duration: string;
  votes: number;
  icon: string;
}

export interface Voting {
  id: string;
  title: string;
  description: string;
  month: string;
  budget: number;
  budgetDescription: string;
  participacionAnt: string;
  options: VotingOption[];
  totalVotes: number;
  endDate: Date;
  votedDnis: string[];
}
