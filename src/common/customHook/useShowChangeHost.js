import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import { usePrevious } from "@common/customHook";
import { getRoomDetailSelector } from "@modules/chat/selectors";
import { profileSelector } from "@modules/user/selectors";

import Toast from "react-native-toast-message";

const useShowChangeHost = () => {
  const { t } = useTranslation("message");

  const profile = useSelector(profileSelector);
  const room = useSelector(getRoomDetailSelector);
  const oldHostName = usePrevious(room?.host?.name);

  useEffect(() => {
    if (oldHostName && room?.host?.name !== oldHostName) {
      if (room?.host?.name && room?.host?.name === profile.name) {
        Toast.show({
          type: "success",
          props: {
            message: t("message:MSG_33"),
            onClose: () => Toast.hide(),
          },
        });
      }
      if (room?.host?.name && room?.host?.name !== profile.name) {
        Toast.show({
          type: "success",
          props: {
            message: t("message:MSG_32", {
              oldHostName,
              newHostName: room?.host?.name,
            }),
            onClose: () => Toast.hide(),
          },
        });
      }
    }

    return () => {
      Toast.hide();
    };
  }, [room?.host?.name]);
};

export default useShowChangeHost;
