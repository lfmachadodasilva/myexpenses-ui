import React from 'react';
// import { useTranslation } from 'react-i18next';

import { GroupModel } from '../../models/group';

export type SearchProps = {
    groups: GroupModel[];
    group: number;

    month: number;

    years: number[];
    year: number;
};

export const SearchComponent: React.FC<SearchProps> = React.memo((props: SearchProps) => {
    // const [t] = useTranslation();
    // const [months] = React.useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    // const [group, setGroup] = React.useState<number>(props.group);
    // const [month, setMonth] = React.useState<number>(props.month);
    // const [year, setYear] = React.useState<number>(props.year);

    // React.useEffect(() => {
    //     setGroup(props.group);
    //     setMonth(props.month);
    //     setYear(props.year);
    // }, [props.group, props.month, props.year]);

    // const handleOnChangeGroup = React.useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    //     setGroup(event.target.value as number);
    // }, []);
    // const handleOnChangeMonth = React.useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    //     setMonth(event.target.value as number);
    // }, []);
    // const handleOnChangeYear = React.useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    //     setYear(event.target.value as number);
    // }, []);

    // const handleOnSearch = React.useCallback(() => {
    //     console.log(group, month, year);
    // }, [group, month, year]);

    // const groupsOptions = React.useMemo(
    //     () =>
    //         props.groups.map(x => (
    //             <option key={'GROUP_' + x.id} value={x.id}>
    //                 {x.name}
    //             </option>
    //         )),
    //     [props.groups]
    // );

    // const monthsOptions = React.useMemo(
    //     () =>
    //         months.map(x => (
    //             <option key={'MONTH_' + x} value={x}>
    //                 {t('MONTHS.' + x)}
    //             </option>
    //         )),
    //     [months, t]
    // );

    // const yearsOptions = React.useMemo(
    //     () =>
    //         props.years.map(x => (
    //             <option key={'YEAR_' + x} value={x}>
    //                 {x}
    //             </option>
    //         )),
    //     [props.years]
    // );

    return (
        <>
            Search Component
            <br></br>
            {/* <label>{t('SEARCH.GROUP')}</label>
            <select className="group" id="group" value={group} defaultValue={group} onChange={handleOnChangeGroup}>
                {groupsOptions}
            </select>
            <label>{t('SEARCH.MONTH')}</label>
            <select className="month" id="month" value={month} defaultValue={month} onChange={handleOnChangeMonth}>
                {monthsOptions}
            </select>
            <label>{t('SEARCH.YEAR')}</label>
            <select className="year" id="year" value={year} defaultValue={year} onChange={handleOnChangeYear}>
                {yearsOptions}
            </select>
            <input type="date" id="date" name="trip-start" value="2018-07-22"></input>
            <button onClick={handleOnSearch}>Search</button> */}
        </>
    );
});
