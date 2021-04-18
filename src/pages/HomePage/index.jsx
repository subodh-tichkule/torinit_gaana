import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { Container, Navbar, Button, Row, Col, Table, Form, FormControl } from 'react-bootstrap';

import ganna from 'global/images/ganna-logo.png'
import { songsList } from 'services/api/home';
import AudioModal from 'components/AudioModal';

const HomePage = () => {
  const history = useHistory();

  const [modalOpen, setModalOpen] = useState(false);
  const [params, setParams] = useState({});

  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState('baby');
  const [value] = useDebounce(searchValue, 1000);

  const [page, setPage] = useState(1);
  const logout = () => {
    sessionStorage.removeItem('sessionToken');
    history.push('/');
  }
  const getList = async (term, offset = 0, limit = 25) => {
    const response = await songsList(term, offset, limit);
    offset == 0 ? setList(response) : setList([...response, ...list])
  }
  const handleClose = () => {
    setModalOpen(false);
  }
  const playSong = (item) => {
    setModalOpen(true);
    setParams(item);
  }
  useEffect(() => {
    getList(value);
    return () => {

    }
  }, [value])
  return (
    <>
      <Navbar expand="lg" variant="light" bg="light" className="p-3">
        <Navbar.Brand href="#"><img className="w-25" src={ganna} alt="" /></Navbar.Brand>
        <Form inline onSubmit={(e) => e.preventDefault()}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={e => { setSearchValue(e.target.value) }} />
        </Form>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button onClick={logout}>Logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <nav aria-label="breadcrumb" className="pt-3">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a >Gaana</a></li>
                <li className="breadcrumb-item active" aria-current="page">Home</li>
              </ol>
            </nav>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>TITLE</th>
                  <th>ARTIST</th>
                  <th>TIME</th>

                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={index}>
                    <td> {index + 1} </td>
                    <td>
                      <div className="text-left" style={{ cursor: 'pointer' }}
                        onClick={() => playSong(item)}><img src={item.artworkUrl60} alt={item.collectionName} width="60" />
                        {` ${ item.collectionName }`}
                      </div>
                    </td>
                    <td> {item.artistName} </td>
                    <td> {item.trackTimeMillis ? (item.trackTimeMillis / 60000).toFixed(2) : null} </td>
                  </tr>
                ))
                }
                {list.length === 0 && (<tr><td colSpan="4">No Tracks Found</td></tr>)}
                {list.length >= 25 && (
                  <tr>
                    <td colSpan="4" className='text-primary'>
                      <span style={{ cursor: 'pointer' }} area-hidden="true"
                        onClick={() => {
                          setPage(page + 1)
                          getList(searchValue, page * 25, 25);
                        }}>
                        Load More...
                  </span></td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <AudioModal modalOpen={modalOpen} handleClose={handleClose} params={params} />
    </>
  )
}

export default HomePage
