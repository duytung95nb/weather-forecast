import { Nav } from 'react-bootstrap';
import { Facebook, Geo, Github, Mailbox, Phone, Youtube } from 'react-bootstrap-icons';

const FooterPage = () => {
  return (
    <div className="d-flex flex-column w-100">
      <footer className="text-center text-lg-start bg-light text-muted">
        <section className={`d-flex justify-content-center p-4 border-bottom`}>
          <Nav>
            <Nav.Item>
              <Nav.Link href="https://www.facebook.com/daoduytung.1211/">
                <Facebook size={30} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="https://github.com/duytung95nb">
                <Github size={30} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="https://www.youtube.com/channel/UC3oYiFVSPsl4HC8zlz1gLYA">
                <Youtube size={30} color={'#FF0000'} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Angular
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    React
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Nodejs
                  </a>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <Geo /> Thu Duc City, HCMC, Vietnam
                </p>
                <p>
                  <Nav.Link href="mail:duytung95nb@gmail.com">
                    <Mailbox /> duytung95nb@gmail.com
                  </Nav.Link>
                </p>
                <p>
                  <Nav.Link href="tel:84949923402">
                    <Phone /> +84 949 923 402
                  </Nav.Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-4">
          © 2021 Copyright:{' '}
          <a className="text-reset fw-bold" href="https://www.facebook.com/daoduytung.1211/">
            Tung Dao
          </a>
        </div>
      </footer>
    </div>
  );
};

export default FooterPage;
