import React, { Component } from 'react'
import Newsitem from './Newsitem'

export default class News extends Component {

    constructor(){
        super();
        console.log("This is constructor")
        this.state={
            articles: [],
            loading : false,
            page:1
        }
    }
     async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=09cd83608fd846b0a4bd91ef5055b358&page=1&pageSize=20";
        let data=await fetch(url);
        let parseData = await data.json();
        console.log(parseData)
        this.setState({articles: parseData.articles ,totalResults:parseData.totalResults})
    }
     handleNext= async()=>{
         if(this.state.page+1>Math.ceil(this.state.totalResults/20)){

         }
         else{
            let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=09cd83608fd846b0a4bd91ef5055b358&page=${this.state.page+1}&pageSize=20`;
            let data=await fetch(url);
            let parseData = await data.json();
            console.log(parseData)
            this.setState({
                page:this.state.page+1,
                articles: parseData.articles
            })
         }
        
    }
    handlePrevious=async()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=09cd83608fd846b0a4bd91ef5055b358&page=${this.state.page-1}&pageSize=20 `;
        let data=await fetch(url);
        let parseData = await data.json();
        console.log(parseData)
        this.setState({
            page:this.state.page+1,
            articles: parseData.articles
        } )  
    }
    render() {
        return (
            <div className="container my-3">
                <h1>Khabar-Top Headlines</h1>
                
                <div className="row">
                {this.state.articles.map((item,i)=>{
                   return   <div className="col-md-4" key={item.url}>
                   <Newsitem title={item.title?item.title.slice(0,45) : ""}  description={item.description ? item.description.slice(0,88) : ""} imgUrl={item.urlToImage} newsUrl={item.url} />   
                       </div> 
                })}


                </div>
                <div className="container d-flex justify-content-between" >
                <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevious} className="btn btn-dark">&larr;Previous</button>
                <button type="button" onClick={this.handleNext} className="btn btn-dark">Next &rarr;</button>
                </div>

                </div>


        )
    }
}
