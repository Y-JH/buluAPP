package com.bulu.cn.constant;

/**
 * @Auther: YJH
 * @Package: Bulo-com.buluedu.baselib.constant
 * @Created time: 2018/8/15-14:29
 * @description: 描述..
 */

public class ConsActions {
    /**  消息通知-变换状态栏主题   **/
    public static final int MAIN_ACTIVITY = 6;//主aty
    public static final int SPLASH_FRAGMENT = 5;//启动页
    public static final int I_TAB_PAGE_HOME = 0;//首页
    public static final int I_TAB_PAGE_LEARNNING_CENTER = 1;//学习天地
    public static final int I_TAB_PAGE_BULO_FAMILY = 2;//咘噜家
    public static final int I_TAB_PAGE_MINE_CENTER = 3;//个人中心


    /** 首页四个tab键命名 **/
    public static final String TAB_PAGE_HOME = "首页";
    public static final String TAB_PAGE_LEARNNING_CENTER = "学习天地";
    public static final String TAB_PAGE_BULO_FAMILY = "咘噜家";
    public static final String TAB_PAGE_MINE_CENTER = "个人中心";




    /**  事件指令-打开显示和关闭web页面           **/
    public static final String NEW_PAGE_EVENT="NEW_PAGE_EVENT";
    public static final String CLOSE_PAGE_EVENT="CLOSE_PAGE_EVENT";
    public static final String CUR_BACK_PAGE_EVENT="CUR_BACK_PAGE_EVENT";
    public static final String CUR_FORWARD_PAGE_EVENT="CUR_FORWARD_PAGE_EVENT";
    public static final String SELECT_AVATAR_EVENT="SELECT_AVATAR_EVENT";
    public static final String SELECT_AVATAR_NOTIFY_EVENT="SELECT_AVATAR_NOTIFY_EVENT";


    /** 欢迎页的点击事件 **/
    public static final String WELCOME_EXPERIENCE = "WELCOME_EXPERIENCE";


    /** 用户登录记录的保存标识，记录登录用户的登录记录 **/
    public static final String USER_LOGIN_RECORD_KEY = "key-for-user-login-record";
    /** 用户使用记录的保存标识，记录用户是否是第一次使用 **/
    public static final String USER_USE_RECORD_KEY = "key-for-user-use-record";


    /**shareSDK分享功能**/
    public static final String SAHRE_SDK_EVENT = "SAHRE_SDK_EVENT";

    /**退出登录、重新登录**/
    public static  final String RESIGNIN = "RESIGNIN";
}
