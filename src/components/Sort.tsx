import React from "react";
import { ISort } from '../services/Interface'

export function Sort({ children, sortBy, filterBy, ascension }: ISort) {

    const sorting = (a: any, b: any) => {

        //Finner verdiene som skal sorteres
        var propA = a.props.children[0].props.children[sortBy].props.children;
        var propB = b.props.children[0].props.children[sortBy].props.children;

        //Sorterer etter nummer
        if (!isNaN(parseInt(propA.substring(0, 2)))) {

            //Sorter etter runtime
            if (sortBy === "1") {
                propA = propA.replace(" min", "");
                propB = propB.replace(" min", "");
            }

            //Sorter etter imdbVotes
            else if (sortBy === "6") {
                propA = propA.replaceAll(",", "");
                propB = propB.replaceAll(",", "");
            }
            
            //Sorter etter imdbRating
            else if (sortBy === "5") {
                propA = propA.replaceAll(".", "");
                propB = propB.replaceAll(".", "");
            }

            propA = parseInt(propA);
            propB = parseInt(propB);

            if (ascension === "DSC") {
                return -1 * (propA - propB);
            } else {
                return propA - propB;
            }

        }
        //sorterer etter bokstaver
        else {
            if (ascension === "DSC") {
                return -1 * (propA.localeCompare(propB));
            } else {
                return propA.localeCompare(propB);
            }
        }
    }

    const filtering = (a: any) => {

        var propA = a.props.children[0].props.children[filterBy].props.children;

        //Filter etter høy imdbRating
        if(filterBy === "5") {
            propA = parseFloat(propA);
            return propA >= 7.5;
        }

        //Filter etter Action
        if(filterBy === "3") {
            return propA.includes("Action");
        }

        //Ingen filter
        else {
            return propA;
        }
    }

    return <> {React.Children.toArray(children).sort(sorting).filter(filtering)} </>;
}

export default Sort;