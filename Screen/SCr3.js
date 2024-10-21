import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";

export default Screen3 = ({ navigation, route }) => {
  const { handle, nameUser, idItem } = route.params;
  const [jobInput, setJobInput] = useState("");

  const addTodoList = async (work) => {
    try {
      const response = await fetch(
        "https://66f620da436827ced9760024.mockapi.io/todo/test1/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(work),
        }
      );

      const itemAdded = await response.json();
      if (response.ok) {
        console.log("Item Added");
        navigation.navigate("Screen2", {
          nameUser: nameUser,
          dataUpdate: itemAdded,
        });
      } else {
        console.log("Add failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleAddItem = () => {
    if (jobInput.trim()) {
      addTodoList({ work: jobInput });
      setJobInput("");
    } else {
      console.log("Input cannot be empty");
    }
  };
  const updateToDoList = async (id, updateWork) => {
    try {
      const response = await fetch(
        `https://66f620da436827ced9760024.mockapi.io/todo/test1/user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ work: updateWork }),
        }
      );
  
      const itemUpdated = await response.json(); // Đọc dữ liệu đã cập nhật
      if (response.ok) {
        navigation.navigate("Screen2", {
          nameUser: nameUser,
          dataUpdate: itemUpdated,  // Gửi itemUpdated về Screen2
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (id, work) => {
    if(jobInput.trim()){
      updateToDoList(id, work),
      setJobInput("")
    }
    else{
      console.log(`Edit Not Empty`);
      
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/avatar.png")} />
        <View style={styles.viewTextInfor}>
          <Text style={styles.textInforBold}>Hi,{nameUser} </Text>
          <Text style={styles.textInfor}>Have a great day ahead</Text>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate("Screen2", {
              nameUser: nameUser,
            });
          }}
        >
          <AntDesign name="arrowleft" size={30} />
        </Pressable>
      </View>
      <Text style={styles.textHeader}>{handle}</Text>
      <View style={styles.viewInput}>
        <AntDesign
          name="book"
          size={30}
          color={"green"}
          style={{ marginLeft: 10 }}
        />
        <TextInput
          value={jobInput}
          onChangeText={setJobInput}
          placeholder="Enter your job"
          style={styles.jobInput}
        />
      </View>

      <Pressable
        style={styles.viewButton}
        onPress={() => {
          if(handle === 'ADD YOUR JOB')
            handleAddItem(jobInput);
          else if (handle === 'EDIT YOUR JOB')
            handleUpdate(idItem, jobInput)
        }}
      >
        <Text style={styles.textButton}>FINISH</Text>
        <AntDesign name="arrowright" size={20} color={"white"} />
      </Pressable>
      <Image
        source={require("../assets/background.png")}
        style={styles.imgNote}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "90%",
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  viewTextInfor: {
    marginLeft: 10,
    width: "78%",
  },
  textInforBold: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textInfor: {
    fontSize: 18,
    color: "#c4c4c4",
    fontWeight: "bold",
  },
  textHeader: {
    marginTop: 30,
    fontSize: 40,
    fontWeight: "bold",
  },
  viewInput: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 15,
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  jobInput: {
    fontSize: 18,
    marginLeft: 10,
    width: "90%",
  },
  viewButton: {
    flexDirection: "row",
    width: "40%",
    backgroundColor: "#00BDD6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    height: 50,
    borderRadius: 20,
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 10,
  },
  imgNote: {
    marginTop: 100,
    width: 400,
    height: 400,
  },
});