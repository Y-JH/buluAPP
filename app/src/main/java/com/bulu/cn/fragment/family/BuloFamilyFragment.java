package com.bulu.cn.fragment.family;

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


/**
 * @Title:BuloFamilyFragment
 * @Package:cn.com.zhongguancun.view.ui.fragment.home.third
 * @Description: tab - 咘噜家
 * @Auther:YJH
 * @Email:yuannunhua@gmail.com
 * @Date:2018/6/2813:53
 */
public class BuloFamilyFragment extends BaseMainFragment {

    private WebAgentFragmentImpl mWebAgent;
    private final String TAG = "BuloFamilyFragment";

    public static BuloFamilyFragment newInstance() {
        Bundle args = new Bundle();
        BuloFamilyFragment fragment = new BuloFamilyFragment();
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
        View view = inflater.inflate(R.layout.fragment_mine_center, container, false);
        mWebAgent = new WebAgentFragmentImpl(this);
//        String url = "https://zixun.html5.qq.com/coolread/list?ch=001203&tabId=10733&title=%E6%90%9E%E7%AC%91&type=onetab&sc_id=hjBAugC";
        String fileUrl = "file:///android_asset/buluApp/templates/bulu/bulu.html";
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
        if(ConsActions.NEW_PAGE_EVENT.equals(event.NEW_PAGE_EVENT)  && event.mFlag == 2){
            Intent intent = new Intent(getActivity(), PublicSecondPageActivity.class);
            intent.putExtra("page_url", event.pageUrl);
            startActivity(intent);


            //第三方分享功能
            /*final String photo ="http://img.mukewang.com/5465af0c0001bb6706000338-590-330.jpg";
                            new ShareDialog.Builder()
                        .setmShareType(SHARE_IMAGE)
                        .setmShareText("百万大奖等你拿")
                        .setmSharePhoto(photo)
                        .build(getActivity()).show();*/
        }
    }
}
