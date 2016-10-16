import React from 'react';
import { connect } from 'react-redux';

class Contents extends React.Component {

  render() {
    
    return  <div className="comp-contents">

        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-2" style={{textAlign: 'center'}}>
                {this.props.title}
              </h1>
            </div>
          </div>
        </section>

        <div className="container" style={{padding: "30px"}}>
          {
            (() => {
              return this.props.members.map((member, index) => {
                return   <article className="media">
                    <div className="media-left">
                      <figure className="image is-128x128">
                        <img src={member.image ? member.image : ""} style={{width: "128px", height: "128px"}}/>
                      </figure>
                    </div>

                    <div className="media-content">
                      <div className="content">
                        <div className="title is-4">
                          {member.name}
                        </div>
                        <div className="subtitle is-5">
                          {member.position}
                        </div>
                        <p>
                          {member.desc}
                        </p>
                      </div>
                    </div>
                  </article>
              });
            })()
          }
        </div>
    </div>
  }
}

const mapStateToProps = (state) => {

  return {
    title   : state.page.title,
    members : state.page.members,
  };
}

export default connect(mapStateToProps)(Contents);