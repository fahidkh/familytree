import React  from "react";
import db from './firebase';
import f3 from "family-chart"; // npm i family-chart
import "./family-chart.css"; // create file 'family-chart.css' in same directory, copy/paste css from examples/create-tree


export default class FamilyTree extends React.Component {
  
  cont = React.createRef();

  constructor(props) {
    super(props)
    this.state = {
      user: ["hello"],
      input: ''
    }
  }
  
  componentDidMount() {

    let tmp_users = [];
    db.collection('FamilyTree').onSnapshot( snapshot => {
        snapshot.forEach( doc => {
          tmp_users.push(doc.data());
        });
        this.setState({
          user: tmp_users
        }, () => {console.log(this.state.user)});
      })

    if (!this.cont.current) return;

    const store = f3.createStore({
        data: data(),
        node_separation: 250,
        level_separation: 150
      }),
      view = f3.d3AnimationView({
        store,
        cont: document.querySelector("#FamilyChart")
      }),
      Card = f3.elements.Card({
        store,
        svg: view.svg,
        card_dim: {
          w: 220,
          h: 70,
          text_x: 75,
          text_y: 15,
          img_w: 60,
          img_h: 60,
          img_x: 5,
          img_y: 5
        },
        card_display: [
          (d) => `${d.data["first name"] || ""} ${d.data["last name"] || ""}`,
          (d) => `${d.data["birthday"] || ""}`
        ],
        mini_tree: true,
        link_break: false
      });

    view.setCard(Card);
    store.setOnUpdate((props) => view.update(props || {}));
    store.update.tree({ initial: true });

    function data() {
        return [
          {
            id: "0",
            rels: {
              spouses: ["8c92765f-92d3-4120-90dd-85a28302504c"],
              father: "0c09cfa0-5e7c-4073-8beb-94f6c69ada19",
              mother: "0fa5c6bc-5b58-40f5-a07e-d787e26d8b56",
              children: [
                "ce2fcb9a-6058-4326-b56a-aced35168561",
                "f626d086-e2d6-4722-b4f3-ca4f15b109ab"
              ]
            },
            data: {
              "first name": "Ahmed",
              "last name": "",
              birthday: "",
              avatar:
                "",
              gender: "M"
            }
          },
          {
            id: "8c92765f-92d3-4120-90dd-85a28302504c",
            data: {
              gender: "F",
              "first name": "Samira",
              "last name": "",
              birthday: "",
              avatar: ""
            },
            rels: {
              spouses: ["0"],
              children: [
                "ce2fcb9a-6058-4326-b56a-aced35168561",
                "f626d086-e2d6-4722-b4f3-ca4f15b109ab"
              ]
            }
          },
          {
            id: "0c09cfa0-5e7c-4073-8beb-94f6c69ada19",
            data: {
              gender: "M",
              "first name": "Jadallah",
              "last name": "",
              birthday: "",
              avatar: ""
            },
            rels: {
              children: ["0"],
              spouses: ["0fa5c6bc-5b58-40f5-a07e-d787e26d8b56"]
            }
          },
          {
            id: "0fa5c6bc-5b58-40f5-a07e-d787e26d8b56",
            data: {
              gender: "F",
              "first name": "Sumaia",
              "last name": "",
              birthday: "",
              avatar: ""
            },
            rels: {
              spouses: ["0c09cfa0-5e7c-4073-8beb-94f6c69ada19"],
              children: ["0"],
              father: "12a9bddf-855a-4583-a695-c73fa8c0e9b2",
              mother: "bd56a527-b613-474d-9f38-fcac0aae218b"
            }
          },
          {
            id: "ce2fcb9a-6058-4326-b56a-aced35168561",
            data: {
              gender: "M",
              "first name": "Emad",
              "last name": "",
              birthday: "",
              avatar: ""
            },
            rels: {
              mother: "8c92765f-92d3-4120-90dd-85a28302504c",
              father: "0",
              spouses: ["b4e33c68-20a7-47ba-9dcc-1168a07d5b52"],
              children: [
                "eabd40c9-4518-4485-af5e-e4bc3ffd27fb",
                "240a3f71-c921-42d7-8a13-dec5e1acc4fd"
              ]
            }
          },
          {
            id: "f626d086-e2d6-4722-b4f3-ca4f15b109ab",
            data: {
              gender: "F",
              "first name": "Renad",
              "last name": "",
              birthday: "",
              avatar: ""
            },
            rels: {
              mother: "8c92765f-92d3-4120-90dd-85a28302504c",
              father: "0"
            }
          },
          {
            id: "eabd40c9-4518-4485-af5e-e4bc3ffd27fb",
            data: {
              "first name": "Fahid",
              "last name": "",
              birthday: "2001",
              avatar:
                localStorage.getItem("photo"),
              gender: "M"
            },
            rels: {
              mother: "b4e33c68-20a7-47ba-9dcc-1168a07d5b52",
              father: "ce2fcb9a-6058-4326-b56a-aced35168561"
            }
          },
          {
            id: "b4e33c68-20a7-47ba-9dcc-1168a07d5b52",
            data: {
              gender: "F",
              "first name": "Ola",
              "last name": "",
              birthday: "",
              avatar: ""
            },
            rels: {
              spouses: ["ce2fcb9a-6058-4326-b56a-aced35168561"],
              children: [
                "eabd40c9-4518-4485-af5e-e4bc3ffd27fb",
                "240a3f71-c921-42d7-8a13-dec5e1acc4fd"
              ]
            }
          },
          {
            id: "240a3f71-c921-42d7-8a13-dec5e1acc4fd",
            data: {
              gender: "F",
              "first name": "Nour",
              "last name": "",
              birthday: "",
              avatar: ""
            },
            rels: {
              mother: "b4e33c68-20a7-47ba-9dcc-1168a07d5b52",
              father: "ce2fcb9a-6058-4326-b56a-aced35168561"
            }
          },
          {
            id: "12a9bddf-855a-4583-a695-c73fa8c0e9b2",
            data: {
              gender: "M",
              "first name": "Mahmood",
              "last name": "",
              birthday: "",
              avatar: ""
            },
            rels: {
              children: ["0fa5c6bc-5b58-40f5-a07e-d787e26d8b56"],
              spouses: ["bd56a527-b613-474d-9f38-fcac0aae218b"]
            }
          },
          {
            id: "bd56a527-b613-474d-9f38-fcac0aae218b",
            data: {
              gender: "F",
              "first name": "Latifa",
              "last name": "",
              birthday: "",
              avatar: ""
            },
            rels: {
              spouses: ["12a9bddf-855a-4583-a695-c73fa8c0e9b2"],
              children: ["0fa5c6bc-5b58-40f5-a07e-d787e26d8b56"]
            }
          }
        ];
      }
    }

  render() {
    return <div className="f3" id="FamilyChart" ref={this.cont}></div>;
  }
}
