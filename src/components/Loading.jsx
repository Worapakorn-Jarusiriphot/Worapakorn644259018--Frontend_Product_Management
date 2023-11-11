import { useLottie } from "lottie-react";

const style = {
    height: 300,
};

const Loading = ({ animation }) => {
    const options = {
        animationData: animation,
        loop: true,
        autoplay: true,
    };

    const { View } = useLottie(options, style);

    return View;
};

export default Loading;