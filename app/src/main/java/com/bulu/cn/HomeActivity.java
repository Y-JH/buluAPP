package com.bulu.cn;

import android.content.Intent;
import android.os.Bundle;

import com.bulu.cn.constant.ConsActions;
import com.bulu.cn.event.TabStatusEvent;
import com.bulu.cn.fragment.login.LoginFragment;
import com.bulu.cn.tool.SharedPreferencesHelper;
import com.gyf.barlibrary.ImmersionBar;

import org.greenrobot.eventbus.Subscribe;

import me.yokeyword.eventbusactivityscope.EventBusActivityScope;
import me.yokeyword.fragmentation.SupportActivity;
import me.yokeyword.fragmentation.anim.DefaultHorizontalAnimator;
import me.yokeyword.fragmentation.anim.FragmentAnimator;

/**
 * @Auther: YJH
 * @Package: Bulo-com.buluedu
 * @Created time: 2018/8/14-15:22
 * @description: 咘噜应用页面的Activity首页入口
 */
public class HomeActivity extends SupportActivity {

    protected ImmersionBar mImmersionBar;
    private boolean reSignIn = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);


        EventBusActivityScope.getDefault(this).register(this);
        //设置状态栏透明
        initImmersionBar(true, false, R.color.translate);
        startScreenMode();

    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        Bundle bundle = intent.getBundleExtra("reSignIn");
        if (null != bundle) {
            reSignIn = bundle.getBoolean("reSignIn");
        }
        if (reSignIn) {
            //如果用户点击重新登录（退出登录）执行这里
            reSignIn = false;
            SharedPreferencesHelper.putSharedPreferences(BaseApplication.getsInstance(), "cid", "");//置空
            popTo(LoginFragment.class, false);
        }

    }

    /**
     * 页面启动方式
     **/
    private void startScreenMode() {
        //加载闪屏页
        if (null == findFragment(SplashFragment.class)) {
            loadRootFragment(R.id.fl_container, SplashFragment.newInstance());
        }
    }

    /**
     * 功能：设置status
     *
     * @param isFullScreen 是否全屏
     * @param isBlackTxt   状态栏字体是否黑色
     * @param statusColor  状态栏背景色
     */
    protected void initImmersionBar(boolean isFullScreen, boolean isBlackTxt, int statusColor) {
        int resColor = R.color.white;
        if (isBlackTxt) {
            resColor = R.color.black;
        }
        mImmersionBar = ImmersionBar.with(this)
                .statusBarColor(statusColor)     //状态栏颜色，不写默认透明色
                .statusBarAlpha(0.3f)  //状态栏透明度，不写默认0.0f
                .statusBarDarkFont(isBlackTxt)   //状态栏字体是深色，不写默认为亮色
                .flymeOSStatusBarFontColor(resColor)  //修改flyme OS状态栏字体颜色
                .fullScreen(isFullScreen);      //有导航栏的情况下，activity全屏显示，也就是activity最下面被导航栏覆盖，不写默认非全屏
        mImmersionBar.init();  //必须调用方可沉浸式
    }

    @Override
    public void onBackPressedSupport() {
        // 对于 4个类别的主Fragment内的回退back逻辑,已经在其onBackPressedSupport里各自处理了
        super.onBackPressedSupport();
    }

    @Override
    public FragmentAnimator onCreateFragmentAnimator() {
        // 设置横向(和安卓4.x动画相同)
        return new DefaultHorizontalAnimator();
    }


    /**
     * 功能：eventbus 接收消息修改状态栏
     *
     * @param event
     */
    @Subscribe
    public void onTabStatusEvent(TabStatusEvent event) {
        if (null == event || event.position == -3) return;
        setImmerSionBar(event.position);
    }

    public void setImmerSionBar(int fragLocation) {
        switch (fragLocation) {
            case ConsActions.I_TAB_PAGE_HOME:
            case ConsActions.I_TAB_PAGE_BULO_FAMILY:
            case ConsActions.I_TAB_PAGE_LEARNNING_CENTER:
            case ConsActions.I_TAB_PAGE_MINE_CENTER:
                initImmersionBar(false, true, R.color.translate);
                break;

            case ConsActions.SPLASH_FRAGMENT:
                initImmersionBar(true, false, R.color.translate);
                break;

            case ConsActions.MAIN_ACTIVITY:
//                initImmersionBar(false, false, R.color.translate);
                break;
        }
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mImmersionBar != null)
            mImmersionBar.destroy();  //在BaseActivity里销毁

        EventBusActivityScope.getDefault(this).unregister(this);
    }


}
