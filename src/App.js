import './App.css';
import NavigationBar from './components/NavigationBar';
import { Container, Row, Col} from 'react-bootstrap';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import CompanyList from './components/CompanyList';
import Company from './components/Company';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  const marginTop={
    marginTop:"2rem"
  }

  return (
    <Router>
      <NavigationBar/>
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
          <Switch>
              <Route path="/" exact component={Welcome} />
              <Route path="/add" exact component={Company} />
              <Route path="/list" exact component={CompanyList} />
              
            </Switch>
            
          </Col>
        </Row>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
