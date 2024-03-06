import { deserializeAs, serializeAs } from "cerialize";

export class UserMaster {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: any;

    @serializeAs('firstName')
    @deserializeAs('firstName')
    private _firstName: string;

    @serializeAs('lastName')
    @deserializeAs('lastName')
    private _lastName: string;

    @serializeAs('address')
    @deserializeAs('address')
    private _address: string;

    @serializeAs('pinCode')
    @deserializeAs('pinCode')
    private _pinCode: string;

    @serializeAs('bio')
    @deserializeAs('bio')
    private _bio: string;

    @serializeAs('phonecode')
    @deserializeAs('phonecode')
    private _phonecode: any;

    @serializeAs('country_id')
    @deserializeAs('country_id')
    private _country_id: any;

    @serializeAs('state_id')
    @deserializeAs('state_id')
    private _state_id: any;

    @serializeAs('cities_id')
    @deserializeAs('cities_id')
    private _cities_id: any;

    @serializeAs('profilePicUrl')
    @deserializeAs('profilePicUrl')
    private _profilePicUrl: any;

    @serializeAs('email')
    @deserializeAs('email')
    private _email: any;

    @serializeAs('mobileNo')
    @deserializeAs('mobileNo')
    private _mobileNo: any;

    constructor() {}


    /**
     * Getter id
     * @return {any}
     */
	public get id(): any {
		return this._id;
	}

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
     * Getter address
     * @return {string}
     */
	public get address(): string {
		return this._address;
	}

    /**
     * Getter pinCode
     * @return {string}
     */
	public get pinCode(): string {
		return this._pinCode;
	}

    /**
     * Getter bio
     * @return {string}
     */
	public get bio(): string {
		return this._bio;
	}

    /**
     * Getter phonecode
     * @return {any}
     */
	public get phonecode(): any {
		return this._phonecode;
	}

    /**
     * Getter country_id
     * @return {any}
     */
	public get country_id(): any {
		return this._country_id;
	}

    /**
     * Getter state_id
     * @return {any}
     */
	public get state_id(): any {
		return this._state_id;
	}

    /**
     * Getter cities_id
     * @return {any}
     */
	public get cities_id(): any {
		return this._cities_id;
	}

    /**
     * Getter profilePicUrl
     * @return {any}
     */
	public get profilePicUrl(): any {
		return this._profilePicUrl;
	}

    /**
     * Getter email
     * @return {any}
     */
	public get email(): any {
		return this._email;
	}

    /**
     * Getter mobileNo
     * @return {any}
     */
	public get mobileNo(): any {
		return this._mobileNo;
	}

    /**
     * Setter id
     * @param {any} value
     */
	public set id(value: any) {
		this._id = value;
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
     * Setter address
     * @param {string} value
     */
	public set address(value: string) {
		this._address = value;
	}

    /**
     * Setter pinCode
     * @param {string} value
     */
	public set pinCode(value: string) {
		this._pinCode = value;
	}

    /**
     * Setter bio
     * @param {string} value
     */
	public set bio(value: string) {
		this._bio = value;
	}

    /**
     * Setter phonecode
     * @param {any} value
     */
	public set phonecode(value: any) {
		this._phonecode = value;
	}

    /**
     * Setter country_id
     * @param {any} value
     */
	public set country_id(value: any) {
		this._country_id = value;
	}

    /**
     * Setter state_id
     * @param {any} value
     */
	public set state_id(value: any) {
		this._state_id = value;
	}

    /**
     * Setter cities_id
     * @param {any} value
     */
	public set cities_id(value: any) {
		this._cities_id = value;
	}

    /**
     * Setter profilePicUrl
     * @param {any} value
     */
	public set profilePicUrl(value: any) {
		this._profilePicUrl = value;
	}

    /**
     * Setter email
     * @param {any} value
     */
	public set email(value: any) {
		this._email = value;
	}

    /**
     * Setter mobileNo
     * @param {any} value
     */
	public set mobileNo(value: any) {
		this._mobileNo = value;
	}





}