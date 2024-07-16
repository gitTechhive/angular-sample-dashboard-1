import { deserializeAs, serializeAs } from "cerialize";
import { Charts } from "./Charts";

export class Dashboard {

    @serializeAs('activeNow')
    @deserializeAs('activeNow')
    private _activeNow: number;

    @serializeAs('activeNowPer')
    @deserializeAs('activeNowPer')
    private _activeNowPer: number;

    @serializeAs('myBalance')
    @deserializeAs('myBalance')
    private _myBalance: number;

    @serializeAs('myBalancePer')
    @deserializeAs('myBalancePer')
    private _myBalancePer: number;

    @serializeAs('totalCustomer')
    @deserializeAs('totalCustomer')
    private _totalCustomer: number;

    @serializeAs('totalCustomerPer')
    @deserializeAs('totalCustomerPer')
    private _totalCustomerPer: number;

    @serializeAs('totalMember')
    @deserializeAs('totalMember')
    private _totalMember: number;

    @serializeAs('totalMemberPer')
    @deserializeAs('totalMemberPer')
    private _totalMemberPer: number;

    @serializeAs('chartData')
    @deserializeAs('chartData')
    private _chartData: Charts[];

    constructor() {
        this.chartData = []
    }


    /**
     * Getter activeNow
     * @return {number}
     */
	public get activeNow(): number {
		return this._activeNow;
	}

    /**
     * Getter activeNowPer
     * @return {number}
     */
	public get activeNowPer(): number {
		return this._activeNowPer;
	}

    /**
     * Getter myBalance
     * @return {number}
     */
	public get myBalance(): number {
		return this._myBalance;
	}

    /**
     * Getter myBalancePer
     * @return {number}
     */
	public get myBalancePer(): number {
		return this._myBalancePer;
	}

    /**
     * Getter totalCustomer
     * @return {number}
     */
	public get totalCustomer(): number {
		return this._totalCustomer;
	}

    /**
     * Getter totalCustomerPer
     * @return {number}
     */
	public get totalCustomerPer(): number {
		return this._totalCustomerPer;
	}

    /**
     * Getter totalMember
     * @return {number}
     */
	public get totalMember(): number {
		return this._totalMember;
	}

    /**
     * Getter totalMemberPer
     * @return {number}
     */
	public get totalMemberPer(): number {
		return this._totalMemberPer;
	}

    /**
     * Getter chartData
     * @return {Charts[]}
     */
	public get chartData(): Charts[] {
		return this._chartData;
	}

    /**
     * Setter activeNow
     * @param {number} value
     */
	public set activeNow(value: number) {
		this._activeNow = value;
	}

    /**
     * Setter activeNowPer
     * @param {number} value
     */
	public set activeNowPer(value: number) {
		this._activeNowPer = value;
	}

    /**
     * Setter myBalance
     * @param {number} value
     */
	public set myBalance(value: number) {
		this._myBalance = value;
	}

    /**
     * Setter myBalancePer
     * @param {number} value
     */
	public set myBalancePer(value: number) {
		this._myBalancePer = value;
	}

    /**
     * Setter totalCustomer
     * @param {number} value
     */
	public set totalCustomer(value: number) {
		this._totalCustomer = value;
	}

    /**
     * Setter totalCustomerPer
     * @param {number} value
     */
	public set totalCustomerPer(value: number) {
		this._totalCustomerPer = value;
	}

    /**
     * Setter totalMember
     * @param {number} value
     */
	public set totalMember(value: number) {
		this._totalMember = value;
	}

    /**
     * Setter totalMemberPer
     * @param {number} value
     */
	public set totalMemberPer(value: number) {
		this._totalMemberPer = value;
	}

    /**
     * Setter chartData
     * @param {Charts[]} value
     */
	public set chartData(value: Charts[]) {
		this._chartData = value;
	}

    

}