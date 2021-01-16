import React, { useRef, useState, useEffect, useMemo } from "react";

const DataGrid = ({
    rows, columns
}) => {
    const gridContainerRef = useRef();
    const gridHeaderRef = useRef();
    const gridBodyRef = useRef();
    const [dimensions, updateDimensions] = useState({
        cellWidth: 100,
        cellHeight: 50,
        gridWidth: 0,
        gridHeight: 0,
        scrollbarWidth: 0
    });
    const rowWidth = dimensions.cellWidth * columns.length;
    useEffect(() => {
        function getScrollbarWidth() {
            // Creating invisible container
            const outer = document.createElement('div');
            outer.style.visibility = 'hidden';
            outer.style.overflow = 'scroll'; // forcing scrollbar to appear
            outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
            document.body.appendChild(outer);

            // Creating inner element and placing it in the container
            const inner = document.createElement('div');
            outer.appendChild(inner);

            // Calculating difference between container's full width and the child width
            const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

            // Removing temporary elements from the DOM
            outer.parentNode.removeChild(outer);

            return scrollbarWidth;

        }
        const calculateDimensions = function () {
            const { current: { offsetWidth, offsetHeight } } = gridContainerRef;
            const _dimensions = { ...dimensions };
            if (offsetWidth > dimensions.cellWidth * columns.length) {
                _dimensions.cellWidth = Math.floor(offsetWidth / columns.length);
            }
            _dimensions.gridWidth = offsetWidth;
            _dimensions.gridHeight = offsetHeight;
            _dimensions.scrollbarWidth = getScrollbarWidth();
            updateDimensions(_dimensions);
        }();

    }, []);
    const onGridBodyScroll = (e) => {
        const { target: { scrollLeft, offsetWidth } } = e;
        gridHeaderRef.current.scroll({
            left: scrollLeft
        });
    }
    const gridHeader = useMemo(() => (
        <div
            className='grid-header-view'
            ref={gridHeaderRef}
            style={{
                top: 0,
                width: dimensions.gridWidth - dimensions.scrollbarWidth,
                height: dimensions.cellHeight
            }}
        >
            <div
                className='grid-header-container'
                style={{
                    width: rowWidth,
                    height: dimensions.cellHeight
                }}
            >
                <div className='header-row-container' style={{
                    height: dimensions.cellHeight,
                    width: rowWidth
                }}>
                    {columns.map((x, ind) => (
                        <div
                            className='header-cell'
                            key={`header-cell-${ind}`}
                            style={{
                                width: dimensions.cellWidth,
                                left: dimensions.cellWidth * ind,
                                height: dimensions.cellHeight
                            }}
                        >{x}</div>
                    ))}
                </div>
            </div>
        </div>
    ), [columns, dimensions, rowWidth]);
    const gridBody = useMemo(() => (
        <div
            className='grid-body-view'
            style={{
                top: dimensions.cellHeight,
                width: dimensions.gridWidth,
                height: dimensions.gridHeight - dimensions.cellHeight
            }}
            ref={gridBodyRef}
            onScroll={onGridBodyScroll}
        >
            <div className='grid-body-container' style={{
                height: dimensions.cellHeight * rows.length,
                width: rowWidth
            }}>
                {rows.map((x, rowInd) => {
                    return <div
                        className='body-row-container'
                        style={{
                            top: dimensions.cellHeight * rowInd,
                            height: dimensions.cellHeight,
                            width: rowWidth
                        }}
                        key={`row-${rowInd}`}
                    >
                        {columns.map((xx, cellInd) => (
                            <div
                                className='body-cell'
                                style={{
                                    width: dimensions.cellWidth,
                                    left: dimensions.cellWidth * cellInd,
                                    height: dimensions.cellHeight
                                }}
                                key={`row-${rowInd}-cell-${cellInd}`}
                            >{x[xx]}</div>
                        ))}
                    </div>
                })}
            </div>
        </div>
    ), [rows, dimensions, rowWidth]);
    return (
        <div className='grid-container' ref={gridContainerRef}>
            {gridHeader}
            {gridBody}
        </div>
    )
}
export default DataGrid;