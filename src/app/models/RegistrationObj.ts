import { deserializeAs, serializeAs } from "cerialize";

export class RegistrationObj {

    @serializeAs('firstName')
    @deserializeAs('firstName')
    private _firstName: string;

    @serializeAs('lastName')
    @deserializeAs('lastName')
    private _lastName: string;

    @serializeAs('email')
    @deserializeAs('email')
    private _email: string;

    @serializeAs('mobileNo')
    @deserializeAs('mobileNo')
    private _mobileNo: string;

    @serializeAs('otp')
    @deserializeAs('otp')
    private _otp: string;

    @serializeAs('requestId')
    @deserializeAs('requestId')
    private _requestId: string;

    @serializeAs('countryCode')
    @deserializeAs('countryCode')
    private _countryCode: string;

    constructor() { }


    /**
     * Getter firstName
     * @return {string}
     */
	public get firstName(): string {
		return this._firstName;
	}

    /**
     * Getter lastName
     * @return {string}
     */
	public get lastName(): string {
		return this._lastName;
	}

    /**
     * Getter email
     * @return {string}
     */
	public get email(): string {
		return this._email;
	}

    /**
     * Getter mobileNo
     * @return {string}
     */
	public get mobileNo(): string {
		return this._mobileNo;
	}

    /**
     * Getter otp
     * @return {string}
     */
	public get otp(): string {
		return this._otp;
	}

    /**
     * Getter requestId
     * @return {string}
     */
	public get requestId(): string {
		return this._requestId;
	}

    /**
     * Getter countryCode
     * @return {string}
     */
	public get countryCode(): string {
		return this._countryCode;
	}

    /**
     * Setter firstName
     * @param {string} value
     */
	public set firstName(value: string) {
		this._firstName = value;
	}

    /**
     * Setter lastName
     * @param {string} value
     */
	public set lastName(value: string) {
		this._lastName = value;
	}

    /**
     * Setter email
     * @param {string} value
     */
	public set email(value: string) {
		this._email = value;
	}

    /**
     * Setter mobileNo
     * @param {string} value
     */
	public set mobileNo(value: string) {
		this._mobileNo = value;
	}

    /**
     * Setter otp
     * @param {string} value
     */
	public set otp(value: string) {
		this._otp = value;
	}

    /**
     * Setter requestId
     * @param {string} value
     */
	public set requestId(value: string) {
		this._requestId = value;
	}

    /**
     * Setter countryCode
     * @param {string} value
     */
	public set countryCode(value: string) {
		this._countryCode = value;
	}


}