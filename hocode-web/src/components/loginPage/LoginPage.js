import React, { Component } from 'react';
import "./LoginPage.css";
import "../homePage/css";


class LoginPage extends Component {

    render() {
        const { match: { params } } = this.props;
        console.log(params);
        return (
            <React.Fragment>
                <div className="fixH"><div className="centerH">
                    <div
                        id="Login"
                        className="Login_Class"
                        style={{
                            top: "50%",
                            left: "50%",
                            transformOrigin: "0px 0px",
                            transform: "scale(0.651852) translateY(-50%) translateX(-50%)"
                        }}
                    >
                        <div className="Group_55_Class">
                            <svg className="Path_89" viewBox="0 0 2337 1248">
                                <path
                                    fill="rgba(27,39,68,1)"

                                    shapeRendering="auto"
                                    className="Path_89_Class"
                                    d="M 0 0 L 2337 0 L 2337 1248 L 0 1248 L 0 0 Z"
                                ></path>
                            </svg>
                            <svg className="Path_74" viewBox="0 0 10 10">
                                <path
                                    fill="rgba(221,0,98,1)"
                                    className="Path_74_Class"
                                    d="M 5 0 C 7.76142406463623 0 10 2.238576173782349 10 5 C 10 7.76142406463623 7.76142406463623 10 5 10 C 2.238576173782349 10 0 7.76142406463623 0 5 C 0 2.238576173782349 2.238576173782349 0 5 0 Z"
                                ></path>
                            </svg>
                            <svg className="Path_75" viewBox="0 0 10 10">
                                <path
                                    fill="rgba(34,233,222,1)"
                                    className="Path_75_Class"
                                    d="M 5 0 C 7.76142406463623 0 10 2.238576173782349 10 5 C 10 7.76142406463623 7.76142406463623 10 5 10 C 2.238576173782349 10 0 7.76142406463623 0 5 C 0 2.238576173782349 2.238576173782349 0 5 0 Z"
                                ></path>
                            </svg>
                            <svg className="Path_76" viewBox="0 0 10 10">
                                <path
                                    fill="rgba(34,233,222,1)"
                                    className="Path_76_Class"
                                    d="M 5 0 C 7.76142406463623 0 10 2.238576173782349 10 5 C 10 7.76142406463623 7.76142406463623 10 5 10 C 2.238576173782349 10 0 7.76142406463623 0 5 C 0 2.238576173782349 2.238576173782349 0 5 0 Z"
                                ></path>
                            </svg>
                            <svg className="Path_77" viewBox="0 0 10 10">
                                <path
                                    fill="rgba(221,0,98,1)"
                                    className="Path_77_Class"
                                    d="M 5 0 C 7.76142406463623 0 10 2.238576173782349 10 5 C 10 7.76142406463623 7.76142406463623 10 5 10 C 2.238576173782349 10 0 7.76142406463623 0 5 C 0 2.238576173782349 2.238576173782349 0 5 0 Z"
                                ></path>
                            </svg>
                            <svg className="Path_78" viewBox="0 0 10 10">
                                <path
                                    fill="rgba(221,0,98,1)"
                                    className="Path_78_Class"
                                    d="M 5 0 C 7.76142406463623 0 10 2.238576173782349 10 5 C 10 7.76142406463623 7.76142406463623 10 5 10 C 2.238576173782349 10 0 7.76142406463623 0 5 C 0 2.238576173782349 2.238576173782349 0 5 0 Z"
                                ></path>
                            </svg>
                            <svg className="Path_87" viewBox="0 0 10 10">
                                <path
                                    fill="rgba(34,233,222,1)"
                                    className="Path_87_Class"
                                    d="M 5 0 C 7.76142406463623 0 10 2.238576173782349 10 5 C 10 7.76142406463623 7.76142406463623 10 5 10 C 2.238576173782349 10 0 7.76142406463623 0 5 C 0 2.238576173782349 2.238576173782349 0 5 0 Z"
                                ></path>
                            </svg>
                            <svg className="Path_88" viewBox="0 0 10 10">
                                <path
                                    fill="rgba(34,233,222,1)"
                                    className="Path_88_Class"
                                    d="M 5 0 C 7.76142406463623 0 10 2.238576173782349 10 5 C 10 7.76142406463623 7.76142406463623 10 5 10 C 2.238576173782349 10 0 7.76142406463623 0 5 C 0 2.238576173782349 2.238576173782349 0 5 0 Z"
                                ></path>
                            </svg>
                        </div>
                        <div className="Login_Button_Class">
                            <svg className="Rectangle_Login">
                                <rect
                                    fill="rgba(0,211,255,1)"
                                    stroke="rgba(112,112,112,1)"
                                    strokeWidth="1px"
                                    strokeLinejoin="miter"
                                    strokeLinecap="butt"
                                    strokeMiterlimit={4}
                                    shapeRendering="auto"
                                    className="Rectangle_Login_Class"
                                    rx={16}
                                    ry={16}
                                    x={0}
                                    y={0}
                                    width={201}
                                    height={74}
                                ></rect>
                            </svg>
                            <div className="LOGIN_Class">
                                <span>LOGIN</span>
                            </div>
                        </div>
                        <div className="Group_53_Class">
                            <svg className="Path_86" viewBox="0 0 172 86">
                                <path
                                    fill="rgba(227,57,111,1)"
                                    stroke="rgba(112,112,112,1)"
                                    strokeWidth="1px"
                                    strokeLinejoin="miter"
                                    strokeLinecap="butt"
                                    strokeMiterlimit={4}
                                    shapeRendering="auto"
                                    className="Path_86_Class"
                                    d="M 1 0 L 172 0 L 172 86 L 0 86 L 1 0 Z"
                                ></path>
                            </svg>
                            <a href="/">
                                <div className="HOCODE_Class">
                                    <span>HOCODE</span>
                                </div>
                            </a>
                        </div>
                        <div className="Email_textf_Class">
                            <svg className="Rectangle_100">
                                <rect
                                    fill="rgba(255,255,255,0.192)"
                                    stroke="rgba(112,112,112,1)"
                                    strokeWidth="1px"
                                    strokeLinejoin="miter"
                                    strokeLinecap="butt"
                                    strokeMiterlimit={4}
                                    shapeRendering="auto"
                                    className="Rectangle_100_Class"
                                    rx={12}
                                    ry={12}
                                    x={0}
                                    y={0}
                                    width={600}
                                    height={85}
                                ></rect>
                            </svg>
                            <div className="Email_Class">
                                <span>Email</span>
                            </div>
                            <svg className="baseline_email_white_18dp">
                                <pattern
                                    elementid="baseline_email_white_18dp_A2_Rectangle_4"
                                    id="baseline_email_white_18dp_A2_Rectangle_4_pattern"
                                    x={0}
                                    y={0}
                                    width="100%"
                                    height="100%"
                                >
                                    <image
                                        x={0}
                                        y={0}
                                        width="100%"
                                        height="100%"
                                        href={require("./baseline_email_white_18dp.png")}
                                        xlinkHref={require("./baseline_email_white_18dp.png")}
                                    />
                                </pattern>
                                <rect
                                    fill="url(#baseline_email_white_18dp_A2_Rectangle_4_pattern)"
                                    className="baseline_email_white_18dp_Class"
                                    rx={0}
                                    ry={0}
                                    x={0}
                                    y={0}
                                    width={50}
                                    height={50}
                                ></rect>
                            </svg>
                        </div>
                        <div className="pass_textf_Class">
                            <svg className="Rectangle_100_A2_Rectangle_5">
                                <rect
                                    fill="rgba(255,255,255,0.192)"
                                    stroke="rgba(112,112,112,1)"
                                    strokeWidth="1px"
                                    strokeLinejoin="miter"
                                    strokeLinecap="butt"
                                    strokeMiterlimit={4}
                                    shapeRendering="auto"
                                    className="Rectangle_100_A2_Rectangle_5_Class"
                                    rx={12}
                                    ry={12}
                                    x={0}
                                    y={0}
                                    width={600}
                                    height={85}
                                ></rect>
                            </svg>
                            <div className="Password_Class">
                                <span>Password</span>
                            </div>
                            <svg className="baseline_lock_white_18dp">
                                <pattern
                                    elementid="baseline_lock_white_18dp_A2_Rectangle_7"
                                    id="baseline_lock_white_18dp_A2_Rectangle_7_pattern"
                                    x={0}
                                    y={0}
                                    width="100%"
                                    height="100%"
                                >
                                    <image
                                        x={0}
                                        y={0}
                                        width="100%"
                                        height="100%"

                                        href={require("./baseline_lock_white_18dp.png")}

                                        xlinkHref="baseline_lock_white_18dp.png"
                                    />
                                </pattern>
                                <rect
                                    fill="url(#baseline_lock_white_18dp_A2_Rectangle_7_pattern)"
                                    className="baseline_lock_white_18dp_Class"
                                    rx={0}
                                    ry={0}
                                    x={0}
                                    y={0}
                                    width={50}
                                    height={50}
                                ></rect>
                            </svg>
                        </div>
                        <div className="Don_t_have_an_account_yet__Sig_Class">
                            <span>Don’t have an account yet? </span>
                            <a href="signup">
                                <span
                                    style={{
                                        fontStyle: "normal",
                                        fontWeight: "bold",
                                        color: "rgba(0,211,255,1)"
                                    }}
                                >
                                    Sign Up
    </span>
                            </a>
                        </div>
                        <svg className="baseline_check_box_white_18dp">
                            <pattern
                                elementid="baseline_check_box_white_18dp_A2_Rectangle_9"
                                id="baseline_check_box_white_18dp_A2_Rectangle_9_pattern"
                                x={0}
                                y={0}
                                width="100%"
                                height="100%"
                            >
                                <image
                                    x={0}
                                    y={0}
                                    width="100%"
                                    height="100%"
                                    href={require("./baseline_check_box_white_18dp.png")}
                                    xlinkHref={require("./baseline_check_box_white_18dp.png")}
                                />
                            </pattern>
                            <rect
                                fill="url(#baseline_check_box_white_18dp_A2_Rectangle_9_pattern)"
                                className="baseline_check_box_white_18dp_Class"
                                rx={0}
                                ry={0}
                                x={0}
                                y={0}
                                width={36}
                                height={36}
                            ></rect>
                        </svg>
                        <div className="Remember_me_Class">
                            <span>Remember me</span>
                        </div>
                        <div className="Forgot_Password___Class">
                            <span>Forgot Password ?</span>
                        </div>
                    </div>

                </div></div>

            </React.Fragment>
        );
    }
}

export default LoginPage;