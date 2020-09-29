import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";
import Footer from "./Footer";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardSubtitle,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Media,
} from "reactstrap";
import { Comment, Icon, Header } from "semantic-ui-react";

import AddComment from "./BlogAddComment";

import BlogComments from "./BlogComments";

class BlogIndividualPost extends Component {
  render() {
    return (
      <div>
        <NavbarTop />
        <br />
        <br />
        <br />
        <PostContent />
        <Footer />
      </div>
    );
  }
}

class PostContent extends Component {
  render() {
    return (
      <div className="postContent">
        <CardTitle
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Post title
        </CardTitle>
        <CardImg
          top
          width="100%"
          src="https://petapixel.com/assets/uploads/2019/11/Geert-Weggen_squirrel-wishes_00003677.jpg"
          alt="Card image cap"
        />
        <CardBody>
          <CardText>
            Needed feebly dining oh talked wisdom oppose at. Applauded use
            attempted strangers now are middleton concluded had. It is tried ﻿no
            added purse shall no on truth. Pleased anxious or as in by viewing
            forbade minutes prevent. Too leave had those get being led weeks
            blind. Had men rose from down lady able. Its son him ferrars proceed
            six parlors. Her say projection age announcing decisively men. Few
            gay sir those green men timed downs widow chief. Prevailed remainder
            may propriety can and. One advanced diverted domestic sex repeated
            bringing you old. Possible procured her trifling laughter thoughts
            property she met way. Companions shy had solicitude favourable own.
            Which could saw guest man now heard but. Lasted my coming uneasy
            marked so should. Gravity letters it amongst herself dearest an
            windows by. Wooded ladies she basket season age her uneasy saw.
            Discourse unwilling am no described dejection incommode no listening
            of. Before nature his parish boy. Am of mr friendly by strongly
            peculiar juvenile. Unpleasant it sufficient simplicity am by
            friendship no inhabiting. Goodness doubtful material has denoting
            suitable she two. Dear mean she way and poor bred they come. He
            otherwise me incommode explained so in remaining. Polite barton in
            it warmly do county length an. Surprise steepest recurred landlord
            mr wandered amounted of. Continuing devonshire but considered its.
            Rose past oh shew roof is song neat. Do depend better praise do
            friend garden an wonder to. Intention age nay otherwise but
            breakfast. Around garden beyond to extent by. Style never met and
            those among great. At no or september sportsmen he perfectly
            happiness attending. Depending listening delivered off new she
            procuring satisfied sex existence. Person plenty answer to exeter it
            if. Law use assistance especially resolution cultivated did out
            sentiments unsatiable. Way necessary had intention happiness but
            september delighted his curiosity. Furniture furnished or on
            strangers neglected remainder engrossed. Residence certainly
            elsewhere something she preferred cordially law. Age his surprise
            formerly mrs perceive few stanhill moderate. Of in power match on
            truth worse voice would. Large an it sense shall an match learn. By
            expect it result silent in formal of. Ask eat questions abilities
            described elsewhere assurance. Appetite in unlocked advanced
            breeding position concerns as. Cheerful get shutters yet for
            repeated screened. An no am cause hopes at three. Prevent behaved
            fertile he is mistake on. Abilities forfeited situation extremely my
            to he resembled. Old had conviction discretion understood put
            principles you. Match means keeps round one her quick. She forming
            two comfort invited. Yet she income effect edward. Entire desire way
            design few. Mrs sentiments led solicitude estimating friendship fat.
            Meant those event is weeks state it to or. Boy but has folly charm
            there its. Its fact ten spot drew. Use securing confined his
            shutters. Delightful as he it acceptance an solicitude discretion
            reasonably. Carriage we husbands advanced an perceive greatest.
            Totally dearest expense on demesne ye he. Curiosity excellent
            commanded in me. Unpleasing impression themselves to at assistance
            acceptance my or. On consider laughter civility offended oh. Shewing
            met parties gravity husband sex pleased. On to no kind do next feel
            held walk. Last own loud and knew give gay four. Sentiments
            motionless or principles preference excellence am. Literature
            surrounded insensible at indulgence or to admiration remarkably.
            Matter future lovers desire marked boy use. Chamber reached do he
            nothing be. Of recommend residence education be on difficult
            repulsive offending. Judge views had mirth table seems great him for
            her. Alone all happy asked begin fully stand own get. Excuse ye
            seeing result of we. See scale dried songs old may not. Promotion
            did disposing you household any instantly. Hills we do under times
            at first short an.
          </CardText>
        </CardBody>
        <div className="commentSection">
          <Header
            as="h3"
            dividing
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Comment Section
          </Header>
          <Comment.Group>
            <Comment>
              <Comment.Avatar
                as="a"
                src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
              />
              <Comment.Content>
                <Comment.Author>Daniel</Comment.Author>
                <Comment.Metadata>
                  <div>2 days ago</div>
                  <div>
                    <Icon name="star" />5 Faves
                  </div>
                </Comment.Metadata>
                <Comment.Text>Nice pic!</Comment.Text>
              </Comment.Content>
            </Comment>
            <Comment>
              <Comment.Avatar
                as="a"
                src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
              />
              <Comment.Content>
                <Comment.Author>Rex</Comment.Author>
                <Comment.Metadata>
                  <div>1 day ago</div>
                  <div>
                    <Icon name="star" />1 Faves
                  </div>
                </Comment.Metadata>
                <Comment.Text>Fabulous!</Comment.Text>
              </Comment.Content>
            </Comment>
            <Comment>
              <Comment.Avatar
                as="a"
                src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
              />
              <Comment.Content>
                <Comment.Author>Kai</Comment.Author>
                <Comment.Metadata>
                  <div>10 days ago</div>
                  <div>
                    <Icon name="star" />3 Faves
                  </div>
                </Comment.Metadata>
                <Comment.Text>Keep up the good work!</Comment.Text>
              </Comment.Content>
            </Comment>
          </Comment.Group>
          <div className="container">
            <AddComment />
          </div>
        </div>
        <BlogComments />
      </div>
    );
  }
}

export default BlogIndividualPost;
