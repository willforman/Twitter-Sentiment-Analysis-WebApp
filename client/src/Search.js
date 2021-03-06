import React, { Component } from 'react';
import axios from "axios";
import SearchBar from "./components/searchbar";
import SearchResultsWithPlaceholder from "./components/searchResultsPlaceholder";

class Search extends Component {
    state = {
        searchTerm: "",
        analysis: {},
    };
    
    handleSearch = (event) => {
        event.preventDefault();

        if (!this.state.searchTerm) return;

        const searchTerm = this.state.searchTerm.trim();

        axios.get("/search", {
            params: {
                searchTerm
            }
        })
            .then( response => {
            this.setState({ searchTerm, analysis: response.data})
            });
    }

    handleChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    }
    
    render() { 
        return ( 
            <React.Fragment>
                <SearchBar
                    onSearch={this.handleSearch}
                    onChange={this.handleChange}
                />
                <SearchResultsWithPlaceholder
                    analysis={this.state.analysis}
                />
            </React.Fragment>
        );
    }
}
 
export default Search;