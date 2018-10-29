package com.bulu.cn;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.bulu.cn.constant.ConsActions;
import com.bulu.cn.event.TabStatusEvent;
import com.bulu.cn.fragment.login.LoginFragment;

import me.yokeyword.eventbusactivityscope.EventBusActivityScope;
import me.yokeyword.fragmentation.SupportFragment;

/**
 * @Auther: YJH
 * @Package: Bulo-com.buluedu
 * @Created time: 2018/8/15-15:22
 * @description: 启动页-splash
 */
public class SplashFragment extends SupportFragment {

    public static SplashFragment newInstance() {
        Bundle args = new Bundle();
        SplashFragment fragment = new SplashFragment();
        fragment.setArguments(args);
        return fragment;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        EventBusActivityScope.getDefault(_mActivity).post(new TabStatusEvent(ConsActions.SPLASH_FRAGMENT));
        View view = inflater.inflate(R.layout.fragment_splash, container, false);
        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

//用户没有登陆，需要进入到登录页面
        startBrotherFragment(LoginFragment.newInstance());
        /*new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                EventBusActivityScope.getDefault(_mActivity).post(new TabStatusEvent(ConsActions.I_TAB_PAGE_HOME));
//                startBrotherFragment(MainFragment.newInstance());
                String used = (String) SharedPreferencesHelper.getSharedPreferences(getActivity(), ConsActions.USER_USE_RECORD_KEY, "");
                if(StringUtils.isEmpty(used)){
                    //为空，表示用户是第一次登录
                    startBrotherFragment(WelcomeFragment.newInstance());

                }else {
                    //非空，表示用户已经不是第一次登录了
                    EventBusActivityScope.getDefault(_mActivity).post(new TabStatusEvent(ConsActions.I_TAB_PAGE_HOME));
                    String userLogin = (String) SharedPreferencesHelper.getSharedPreferences(getContext(), ConsActions.USER_LOGIN_RECORD_KEY, "");
                    if (StringUtils.isEmpty(userLogin)) {
                        //用户没有登陆，需要进入到登录页面
                        startBrotherFragment(LoginFragment.newInstance());

                    } else {
                        startBrotherFragment(MainFragment.newInstance());
                    }
                }

            }
        }, 800);*/
    }


    /**
     * start other BrotherFragment
     */
    public void startBrotherFragment(SupportFragment targetFragment) {
        start(targetFragment);
    }
}
