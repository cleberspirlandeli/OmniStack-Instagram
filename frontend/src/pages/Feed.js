import React, { Component } from 'react';
import api from './../services/api';
import io from 'socket.io-client'

import Header from './../components/Header'

import './Feed.css';

import more from './../assets/more.svg';
import comment from './../assets/comment.svg';
import like from './../assets/like.svg';
import send from './../assets/send.svg';


export default class Feed extends Component {

    state = {
        feed: [],
    }

    async componentDidMount() {
        this.registerToSocket();
        const response = await api.get('posts');
        this.setState({ feed: response.data });
    }


    registerToSocket = () => {
        const socket = io(process.env.REACT_APP_BASE_URL_API);

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] });
        });

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post =>
                    post._id === likedPost._id ? likedPost : post
                )
            });
        });
    }

    handleLike = id => {
        api.post(`posts/${id}/like`);
    }

    render() {
        return (
            <div>
                <Header />
                <section id="post-list">

                    {this.state.feed.map(post => (
                        <article key={post._id}>
                            <header>
                                <div className="user-info">
                                    <span>{post.author}</span>
                                    <span className="place">{post.place}</span>
                                </div>

                                <img src={more} alt="Mais" />
                            </header>

                            <img src={`${process.env.REACT_APP_BASE_URL_API}files/${post.image}`} alt="" />

                            <footer>
                                <div className="actions">
                                    <button type="button" onClick={() => this.handleLike(post._id)}>
                                        <img src={like} alt="Curtir" />
                                    </button>
                                    <img src={comment} alt="Comentar" />
                                    <img src={send} alt="Enviar" />
                                </div>
                                <strong>{post.like} curtidas</strong>
                                <p>{post.description}
                                    <span>{post.hashtags}</span>
                                </p>
                            </footer>
                        </article>
                    )

                    )}

                </section>
            </div>

        );
    }
}