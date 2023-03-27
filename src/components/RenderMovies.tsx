import React from "react";
import {
    List,
    AutoSizer,
    CellMeasurer,
    CellMeasurerCache,
    InfiniteLoader
  } from "react-virtualized";
import { Movie } from "../types";

  type Props = {
    hasNextPage: boolean;
    isNextPageLoading: boolean;
    movies: any[];
    loadNextPage: () => void;    
    onSelect: (movie: Movie) => void;        
  };
  
const RenderMovies: React.FC<Props> =({movies, hasNextPage, loadNextPage, isNextPageLoading, onSelect})=>{

    const itemCount = hasNextPage ? movies.length + 1 : movies.length;

    const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  
    const isItemLoaded = (index: any) => !hasNextPage || index < movies.length;
  
    const cache = React.useRef(
        new CellMeasurerCache({
          fixedWidth: true,
          defaultHeight: 100,
        })
      );
    return (
        <>
            <InfiniteLoader
            isRowLoaded={isItemLoaded}
            // @ts-ignore
            loadMoreRows={loadMoreItems}
            rowCount={itemCount}>
                 
            {({ onRowsRendered, registerChild }) => (
                <div style={{ width: "100%", height: "93vh" }}>
                    <AutoSizer>
                        {({width,height})=>
                            <List
                            width={width} 
                            height={height} 
                            rowHeight={cache.current.rowHeight} 
                            deferredMeasurementCache={cache.current}
                            rowCount={movies.length}
                            onRowsRendered={onRowsRendered}
                            rowRenderer={({ key, index, style, parent }) => {
                                const movie = movies[index];
                                return(
                                    <CellMeasurer key={key} cache={cache.current} parent={parent} columnIndex={0} rowIndex={index}>
                                    <div style={style}>                            
                                        <li
                                            onClick={() => onSelect(movie)}
                                            key={movie.Title}
                                            className="movie-list-item"
                                            >                                                                                                    
                                                <h4>{movie.Title}</h4>
                                                <h4>{movie.Year}</h4>                                                                                                    
                                        </li>
                                    </div> 
                                    </CellMeasurer>
                                )
                            }
                            }/>
                        }
                    </AutoSizer>
            </div>
            )}
            </InfiniteLoader>           
        </>    
    )
}

export default RenderMovies;