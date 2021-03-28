interface Range {
    start: number;
    end: number;
}
interface ZoneInfo extends Range {
    isLastZone: boolean;
}
export { Range, ZoneInfo };
