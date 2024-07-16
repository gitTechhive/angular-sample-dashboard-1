import { deserializeAs, serializeAs } from "cerialize";

export class Charts {

    @serializeAs('chart')
    @deserializeAs('chart')
    private _chart: any;

    @serializeAs('dataLabels')
    @deserializeAs('dataLabels')
    private _dataLabels: any;

    @serializeAs('fill')
    @deserializeAs('fill')
    private _fill: any;

    @serializeAs('legend')
    @deserializeAs('legend')
    private _legend: any;

    @serializeAs('plotOptions')
    @deserializeAs('plotOptions')
    private _plotOptions: any;

    @serializeAs('responsive')
    @deserializeAs('responsive')
    private _responsive: any;

    @serializeAs('series')
    @deserializeAs('series')
    private _series: any;

    @serializeAs('xaxis')
    @deserializeAs('xaxis')
    private _xaxis: any;

    @serializeAs('stroke')
    @deserializeAs('stroke')
    private _stroke: any;

    @serializeAs('labels')
    @deserializeAs('labels')
    private _labels: any;

    @serializeAs('tooltip')
    @deserializeAs('tooltip')
    private _tooltip: any;


    /**
     * Getter tooltip
     * @return {any}
     */
	public get tooltip(): any {
		return this._tooltip;
	}

    /**
     * Setter tooltip
     * @param {any} value
     */
	public set tooltip(value: any) {
		this._tooltip = value;
	}



    /**
     * Getter labels
     * @return {any}
     */
	public get labels(): any {
		return this._labels;
	}

    /**
     * Setter labels
     * @param {any} value
     */
	public set labels(value: any) {
		this._labels = value;
	}



    /**
     * Getter chart
     * @return {any}
     */
	public get chart(): any {
		return this._chart;
	}

    /**
     * Getter dataLabels
     * @return {any}
     */
	public get dataLabels(): any {
		return this._dataLabels;
	}

    /**
     * Getter fill
     * @return {any}
     */
	public get fill(): any {
		return this._fill;
	}

    /**
     * Getter legend
     * @return {any}
     */
	public get legend(): any {
		return this._legend;
	}

    /**
     * Getter plotOptions
     * @return {any}
     */
	public get plotOptions(): any {
		return this._plotOptions;
	}

    /**
     * Getter responsive
     * @return {any}
     */
	public get responsive(): any {
		return this._responsive;
	}

    /**
     * Getter series
     * @return {any}
     */
	public get series(): any {
		return this._series;
	}

    /**
     * Getter xaxis
     * @return {any}
     */
	public get xaxis(): any {
		return this._xaxis;
	}

    /**
     * Getter stroke
     * @return {any}
     */
	public get stroke(): any {
		return this._stroke;
	}

    /**
     * Setter chart
     * @param {any} value
     */
	public set chart(value: any) {
		this._chart = value;
	}

    /**
     * Setter dataLabels
     * @param {any} value
     */
	public set dataLabels(value: any) {
		this._dataLabels = value;
	}

    /**
     * Setter fill
     * @param {any} value
     */
	public set fill(value: any) {
		this._fill = value;
	}

    /**
     * Setter legend
     * @param {any} value
     */
	public set legend(value: any) {
		this._legend = value;
	}

    /**
     * Setter plotOptions
     * @param {any} value
     */
	public set plotOptions(value: any) {
		this._plotOptions = value;
	}

    /**
     * Setter responsive
     * @param {any} value
     */
	public set responsive(value: any) {
		this._responsive = value;
	}

    /**
     * Setter series
     * @param {any} value
     */
	public set series(value: any) {
		this._series = value;
	}

    /**
     * Setter xaxis
     * @param {any} value
     */
	public set xaxis(value: any) {
		this._xaxis = value;
	}

    /**
     * Setter stroke
     * @param {any} value
     */
	public set stroke(value: any) {
		this._stroke = value;
	}



}