package com.bulu.cn.fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.bulu.cn.R;
import com.bulu.cn.agent.IAndroidCallbackFirstAgent;
import com.bulu.cn.agent.WebAgentFragmentImpl;
import com.bulu.cn.base.BaseBackFragment;
import com.bulu.cn.constant.ConsActions;
import com.bulu.cn.event.IAndroidFirstPageEvent;
import com.bulu.cn.tool.AppManager;
import com.just.agentweb.AgentWeb;

import org.greenrobot.eventbus.Subscribe;

import me.yokeyword.eventbusactivityscope.EventBusActivityScope;
import me.yokeyword.fragmentation.SupportFragment;

/**
 * @Auther: YJH
 * @Package: Bulo-com.buluedu.baselib.fragment
 * @Created time: 2018/8/15-15:21
 * @description: 由首页进入的新的webview一级页面，承载ta的是PublicSecondPageActivity，公共使用页面；承载该webview的是HomeActivity.
 */
public class PublicFirstWebViewFragment extends BaseBackFragment {
    private static final String TAG = "PolicyPublicFragment";
    private WebAgentFragmentImpl mWebAgent;
    private static final String WEB_URL = "WEB_URL";
    public static PublicFirstWebViewFragment newInstance(String url) {

        Bundle args = new Bundle();
        PublicFirstWebViewFragment fragment = new PublicFirstWebViewFragment();
        args.putString(WEB_URL, url);
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
        View view = inflater.inflate(R.layout.fragment_web_public, container, false);
        return view;
    }

    private void initView(View view) {
        String url = this.getArguments().getString(WEB_URL);
        mWebAgent = new WebAgentFragmentImpl(this);
        mWebAgent.setWebUrl(url);
        mWebAgent.showWeb(view);

        AgentWeb curAgentWeb = mWebAgent.getAgentWeb();
        if (null != curAgentWeb) {
            //注入对象,很关键
            curAgentWeb.getJsInterfaceHolder()
                    .addJavaObject("android", new IAndroidCallbackFirstAgent(curAgentWeb, this.getActivity()));
        }
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        initView(getView());
    }

    @Override
    public void onLazyInitView(@Nullable Bundle savedInstanceState) {
        super.onLazyInitView(savedInstanceState);

    }

    @Override
    public void onSupportInvisible() {
        super.onSupportInvisible();
        hideSoftInput();
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
    public void showAndroidNewFirstPage(IAndroidFirstPageEvent.NewPage event) {
        if(ConsActions.NEW_PAGE_EVENT.equals(event.NEW_PAGE_EVENT)){
            startBrotherFragment(PublicSecondWebViewFragment.newInstance(event.pageUrl));
        }
    }

    /**
     * 功能：eventbus 接收消息修改状态栏
     * @param event
     */
    @Subscribe
    public void closeAndroidFirstPage(IAndroidFirstPageEvent.ClosePage event) {
        if(ConsActions.CLOSE_PAGE_EVENT.equals(event.CLOSE_PAGE_EVENT)){
            Log.e(TAG,"接收消息修改状态栏 关闭11111");
//            getActivity().finish();
            AppManager.getInstance().finishAllActivity();
        }
    }

    /**
     * start other BrotherFragment
     */
    public void startBrotherFragment(SupportFragment targetFragment) {
        start(targetFragment);
    }

//    @Override
//    public boolean onBackPressedSupport() {
//        EventBusActivityScope.getDefault(_mActivity).post(new TabStatusEvent(MainActivity.MINE_CENTER));
//        return super.onBackPressedSupport();
//
//    }

}
