import React, { useEffect, useState } from "react";
import { Form, Card, Image, Icon } from "semantic-ui-react";

export const SearchContent = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repo, setRepo] = useState("");
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2KjSSmrEae3wYQLZrIWvA-aEa-KPuxWlH3Q&usqp=CAU"
  );
  const [userInput, setUserInput] = useState("example");
  const [error, setError] = useState("");

  const getData = async () => {
    const response = await fetch(`https://api.github.com/users/${userInput}`);
    const data = await response.json();
    setData(data);
    {
      data.message ? setError(data.message) : null;
    }
    console.log(data);
  };

  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url
  }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepo(public_repos);
    setImage(avatar_url);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="navbar">Github Search</div>
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Github User"
              name="github user"
              onChange={handleSearch}
            />
            <Form.Button content="search" />
          </Form.Group>
        </Form>
      </div>
      <div className="card">
        <Card>
          <Image src={image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{name ? name : error}</Card.Header>
            <Card.Header>{username}</Card.Header>
            <a href="https://github.com">
              <Icon name="user" />
              {following} Following
            </a>
            <a href="https://github.com">
              <Icon name="user" />
              {repo} Repo
            </a>
          </Card.Content>
          <Card.Content extra>
            <a href="https://github.com">
              <Icon name="user" />
              {followers} followers
            </a>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};
