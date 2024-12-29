import { query } from "express";

export const getFilteredData = ( queryObj, dataset ) => {
    let _filteredData  = dataset;
    let err = null;
    const queryKeys = Object.keys( queryObj );
    const validKeys = Object.keys( _filteredData[0] );
    const isQueryValid = queryKeys.every( ( key ) => validKeys.find( ( _key ) => key === _key ) )

    if ( !isQueryValid ) {
        err = new Error( "[!] Invalid query arguments received..." );
        return [ null, err ];
    }

    for ( const key of queryKeys ) {
        _filteredData = _filteredData.filter( ( dataObj ) => {
            const qValue = queryObj[ key ];
            let checkValue = dataObj[ key ];

            if ( !(Number(qValue)) ) {
                checkValue = checkValue.toLowerCase();
                return checkValue.includes( qValue )
            }

            if ( Number( qValue ) ) return checkValue === Number( qValue );

            return;

        } )
    }
    return [ _filteredData, null ];
}