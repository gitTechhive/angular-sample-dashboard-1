import { serializeAs, deserializeAs } from 'cerialize';

export class ResponseWrapperDTO {
  @deserializeAs('status')
  private _status: number;

  @deserializeAs('message')
  private _message: string;

  @deserializeAs('data')
  private _data: object;

  @serializeAs('error')
  @deserializeAs('error')
  private _error: any;

  @deserializeAs('path')
  private _path: string;

  @deserializeAs('isResponseOnPage')
  private _isResponseOnPage: boolean;

  /**
   * Getter status
   * @return {number}
   */
  public get status(): number {
    return this._status;
  }

  /**
   * Getter message
   * @return {string}
   */
  public get message(): string {
    return this._message;
  }

  /**
   * Getter data
   * @return {object}
   */
  public get data(): object {
    return this._data;
  }

  /**
   * Getter error
   * @return {string}
   */
  public get error(): string {
    return this._error;
  }

  /**
   * Getter path
   * @return {string}
   */
  public get path(): string {
    return this._path;
  }

  /**
   * Getter isResponseOnPage
   * @return {boolean}
   */
  public get isResponseOnPage(): boolean {
    return this._isResponseOnPage;
  }

  /**
   * Setter status
   * @param {number} value
   */
  public set status(value: number) {
    this._status = value;
  }

  /**
   * Setter message
   * @param {string} value
   */
  public set message(value: string) {
    this._message = value;
  }

  /**
   * Setter data
   * @param {object} value
   */
  public set data(value: object) {
    this._data = value;
  }

  /**
   * Setter error
   * @param {string} value
   */
  public set error(value: string) {
    this._error = value;
  }

  /**
   * Setter path
   * @param {string} value
   */
  public set path(value: string) {
    this._path = value;
  }

  /**
   * Setter isResponseOnPage
   * @param {boolean} value
   */
  public set isResponseOnPage(value: boolean) {
    this._isResponseOnPage = value;
  }

}

