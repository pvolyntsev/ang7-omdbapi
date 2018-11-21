export class Pagination {
  public length = 0;
  public pageSize = 10;
  public pageIndex = 0;

  public reset(): void {
    this.length = 0;
    this.pageSize = 10;
    this.pageIndex = 0;
  }
}
