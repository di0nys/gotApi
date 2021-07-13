import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import ErrorMessage from '../error/errorMessage';
import CharacterPage from "../characterPage/characterPage";
import gotService from '../../services/gotService';
import './app.css';
import CharDetails from "../charDetails";

export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        selectedChar: null,
        error: false
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error:true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    };

    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;
        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button
                                className="toggle-btn"
                                onClick={this.toggleRandomChar}>Toggle random character</button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onCharSelected={this.onCharSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem= {(item) => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails
                                charID={this.state.selectedChar}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onCharSelected={this.onCharSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails
                                charID={this.state.selectedChar}
                            />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};