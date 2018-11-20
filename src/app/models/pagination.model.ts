export class Pagination {
  public length: Number = 0;
  public pageSize: Number = 10;
  public pageIndex: Number = 0;

  public reset(): void {
    this.length = 0;
    this.pageSize = 10;
    this.pageIndex = 0;
  }
}
