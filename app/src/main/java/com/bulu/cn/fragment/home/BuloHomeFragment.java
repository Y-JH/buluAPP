package com.bulu.cn.fragment.home;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.bulu.cn.PublicSecondPageActivity;
import com.bulu.cn.R;
import com.bulu.cn.agent.IAndroidCallbackHomeAgent;
import com.bulu.cn.agent.WebAgentFragmentImpl;
import com.bulu.cn.base.BaseMainFragment;
import com.bulu.cn.constant.ConsActions;
import com.bulu.cn.event.IAndroidHomePageEvent;
import com.just.agentweb.AgentWeb;

import org.greenrobot.eventbus.Subscribe;

import me.yokeyword.eventbusactivityscope.EventBusActivityScope;
import me.yokeyword.fragmentation.SupportFragment;


/**
 * @Title:BuloHomeFragment
 * @Package:cn.com.zhongguancun.view.ui.fragment.home.one
 * @Description: tab - 首页
 * @Auther:YJH
 * @Email:yuannunhua@gmail.com
 * @Date:2018/6/2813:51
 */
public class BuloHomeFragment extends BaseMainFragment {
    private static final String TAG = "BuloHomeFragment";
    private WebAgentFragmentImpl mWebAgent;


    public static BuloHomeFragment newInstance() {
        Bundle args = new Bundle();
        BuloHomeFragment fragment = new BuloHomeFragment();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        EventBusActivityScope.getDefault(getActivity()).register(this);
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_bulo_home, container, false);
        mWebAgent = new WebAgentFragmentImpl(this);
        String fileUrl = "file:///android_asset/buluApp/templates/home/home.html";
        mWebAgent.setWebUrl(fileUrl);
        return view;
    }


    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        mWebAgent.showWeb(getView());

        AgentWeb curAgentWeb = mWebAgent.getAgentWeb();
        if (null != curAgentWeb) {
            //注入对象,很关键
            //注入的是home首页 与js的交互接口
            curAgentWeb.getJsInterfaceHolder()
                    .addJavaObject("android", new IAndroidCallbackHomeAgent(curAgentWeb, this.getActivity()));
        }
    }

    @Override
    public void onLazyInitView(@Nullable Bundle savedInstanceState) {
        super.onLazyInitView(savedInstanceState);

    }

    @Override
    public void onDestroyView() {
        mWebAgent.onWebDestroyView();
        super.onDestroyView();

        EventBusActivityScope.getDefault(getActivity()).unregister(this);
    }


    @Override
    public void onResume() {
        mWebAgent.onWebResume();
        super.onResume();
    }

    @Override
    public void onPause() {
        mWebAgent.onWebPause();
        super.onPause();
    }



    /**
     * 功能：eventbus 接收消息修改状态栏
     * @param event
     */
    @Subscribe
    public void onHomeShowPage(IAndroidHomePageEvent.NewPage event) {
        if(ConsActions.NEW_PAGE_EVENT.equals(event.NEW_PAGE_EVENT) && event.mFlag == 0){
//            startBrotherFragment(PublicFirstWebViewFragment.newInstance(event.pageUrl));
            Intent intent = new Intent(getActivity(), PublicSecondPageActivity.class);
            intent.putExtra("page_url", event.pageUrl);
            startActivity(intent);
        }
    }

    /**
     * start other BrotherFragment
     */
    public void startBrotherFragment(SupportFragment targetFragment) {
        start(targetFragment);
    }
}
