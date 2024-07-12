import { Image, TouchableOpacity } from "react-native";

import styles from "./screenheader.style";

const ScreenHeaderBtn = ({ task_name, task_count }) => {
  return (
    <TouchableOpacity style={styles.btnContainer}>
      <Text>{task_name} {task_count}</Text>
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;