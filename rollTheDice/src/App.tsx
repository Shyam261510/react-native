import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import diceOne from "../assets/One.png";
import diceTwo from "../assets/Two.png";
import diceThree from "../assets/Three.png";
import diceFour from "../assets/Four.png";
import diceFive from "../assets/Five.png";
import diceSix from "../assets/Six.png";
import { PropsWithChildren } from "react";
type diceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType;
}>;
const Dice = ({ imageUrl }: diceProps): JSX.Element => {
  return (
    <View>
      <Image source={imageUrl} />
    </View>
  );
};
const App = (): JSX.Element => {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(diceOne);
  const roleDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    randomNumber === 1
      ? setDiceImage(diceOne)
      : randomNumber === 2
      ? setDiceImage(diceTwo)
      : randomNumber === 3
      ? setDiceImage(diceThree)
      : randomNumber === 4
      ? setDiceImage(diceFour)
      : randomNumber === 5
      ? setDiceImage(diceFive)
      : setDiceImage(diceSix);
  };
  return (
    <View>
      <Text>Rolling Dice</Text>
      <Dice imageUrl={diceImage} />
      <TouchableOpacity onPress={roleDice}>
        <Text>Roll Dice</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
