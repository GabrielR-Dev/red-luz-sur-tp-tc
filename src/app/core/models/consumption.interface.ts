export type ConsumptionLevel = 'green' | 'yellow' | 'red';

export interface ConsumptionData {
  monthlyConsumption: number;
  limitGreen: number;
  limitYellow: number;
  limitRed: number;
}
