import { SearchBar } from "react-native-elements";
import React, { useState, useEffect } from "react";
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { SafeAreaView } from "react-native-safe-area-context";
import Product from "./Product";
import ProductSPBC from "./ProductSPBC";
import { useNavigation } from "@react-navigation/native";
import ProductKM from "./ProductKM";

const Data = [
  {
    id: 1,
    name: "abcabc",
    src: require("../../assets/slide-bgr1.jpg"),
  },
  {
    id: 2,
    name: "abcabc",
    src: require("../../assets/slide-bgr3.jpg"),
  },
  {
    id: 3,
    name: "abcabc",
    src: require("../../assets/slide-bgr2.jpg"),
  },
  {
    id: 4,
    name: "abcabc",
    src: require("../../assets/slide-bgr4.jpg"),
  },
];
export default function App() {
  const navigation = useNavigation();
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setfilterdData] = useState("");

  useEffect(() => {
    fetchPost();
    return () => {};
  }, []);
  const fetchPost = () => {
    const apiURL = "http://192.168.1.20:44398/api/app/product";
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => {
        searchFilter(responseJson.items);
        setMasterData(responseJson.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.product.name
          ? item.product.name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setfilterdData(text);
    } else {
      setFilterData(null);
      setfilterdData(text);
    }
  };
  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Chi tiết sản phẩm", { item })}
      >
        <Image
          style={{
            width: 50,
            height: 50,
            resizeMode: "stretch",
            marginHorizontal: "1.5%",
          }}
          source={{ uri: item.product.image }}
        />
        <Text>{item.product.name}</Text>
      </TouchableOpacity>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          top: "3.5%",
          zIndex: 2,
          flex: 1,
          width: "100%",
        }}
      >
        <SearchBar
          containerStyle={style.textInputStyle}
          inputContainerStyle={style.input}
          placeholder="Type Here..."
          onChangeText={(text) => searchFilter(text)}
          value={search}
          underlineColorAndroid="transparent"
        />
        <FlatList
          data={filterData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
      <ScrollView style={{ zIndex: 0 ,marginTop:'15%'}}>
        <View style={style.slide}>
          <SwiperFlatList
            autoplay
            autoplayDelay={2}
            autoplayLoop
            index={2}
            showPagination
            data={Data}
            renderItem={({ item }) => (
              <View style={style.child}>
                <Image
                  style={{ maxHeight: 160, width: "auto" }}
                  source={item.src}
                ></Image>
              </View>
            )}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Text style={style.productNew}>Sản phẩm mới</Text>
          <TouchableOpacity
            style={{ marginTop: 4 }}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Sản phẩm mới")}
          >
            <Text style={style.getall}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Product />
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={style.product}>Sản phẩm bán chạy</Text>
          <TouchableOpacity
            style={{ marginTop: 4 }}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Sản phẩm bán chạy")}
          >
            <Text style={style.getall}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ProductSPBC />
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={style.product1}>Sản phẩm khuyến mãi</Text>
          <TouchableOpacity
            style={{ marginTop: 4 }}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Sản phẩm mới")}
          >
            <Text style={style.getall}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ProductKM />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const { width } = Dimensions.get("window");
const style = StyleSheet.create({
  // itemStyle: {
  //   flexDirection:'row',
  //   backgroundColor: "white",
  // },
  container: {
    backgroundColor: "#338f38",
    height: 55,
    borderBottomColor: "#338f38",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
  },
  slide: { backgroundColor: "white", height: 160 },
  child: { width, justifyContent: "center" },
  getall: {
    fontSize: 16,
    color: "red",
  },
  productNew: {
    fontSize: 20,
    marginLeft: 7,
    marginRight: "40%",
    fontWeight: "bold",
    color: "#338f38",
  },
  product: {
    fontSize: 20,
    marginRight: "27%",
    marginLeft: 7,
    fontWeight: "bold",
    color: "#338f38",
  },
  product1: {
    fontSize: 20,
    marginRight: "20%",
    marginLeft: 7,
    fontWeight: "bold",
    color: "#338f38",
  },
  textInputStyle: {
    borderWidth: 1,
    borderTopColor: "#338f38",
    borderRightColor: "#338f38",
    borderLeftColor: "#338f38",
    borderBottomColor: "#338f38",
    backgroundColor: "#338f38",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
