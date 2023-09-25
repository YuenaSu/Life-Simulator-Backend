export default interface Business {
  name: string;
  type: 'technology' | 'real estate' | 'entertainment' | 'food' | 'service';
  investment: number;
  revenue: number;
}
