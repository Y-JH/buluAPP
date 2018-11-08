package com.bulu.cn;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.bulu.cn.constant.ConsActions;
import com.bulu.cn.event.TabStatusEvent;
import com.bulu.cn.fragment.family.BuloFamilyFragment;
import com.bulu.cn.fragment.home.BuloHomeFragment;
import com.bulu.cn.fragment.learning.LearningCenterFragment;
import com.bulu.cn.fragment.mine.MineCenterFragment;
import com.bulu.cn.wiget.bottomview.BottomBar;
import com.bulu.cn.wiget.bottomview.BottomBarTab;

import me.yokeyword.eventbusactivityscope.EventBusActivityScope;
import me.yokeyword.fragmentation.SupportFragment;

/**
 * @Auther: YJH
 * @Package: Bulo-com.buluedu
 * @Created time: 2018/8/14-19:22
 * @description: 咘噜应用的首页-页面切换管理类
 */
public class MainFragment extends SupportFragment {
    private final String TAG = "MainFragment";
    private static final int REQ_MSG = 10;
    private SupportFragment[] mFragments = new SupportFragment[4];
    private BottomBar mBottomBar;

    public static MainFragment newInstance() {
        Bundle args = new Bundle();
        MainFragment fragment = new MainFragment();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_main, container, false);
        initView(view);
        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        //第一次进入home页面
        EventBusActivityScope.getDefault(_mActivity).post(new TabStatusEvent(ConsActions.I_TAB_PAGE_HOME));
        SupportFragment firstFragment = findChildFragment(BuloHomeFragment.class);
        if (firstFragment == null) {
            mFragments[ConsActions.I_TAB_PAGE_HOME] = BuloHomeFragment.newInstance();
            mFragments[ConsActions.I_TAB_PAGE_LEARNNING_CENTER] = LearningCenterFragment.newInstance();
            mFragments[ConsActions.I_TAB_PAGE_BULO_FAMILY] = BuloFamilyFragment.newInstance();
            mFragments[ConsActions.I_TAB_PAGE_MINE_CENTER] = MineCenterFragment.newInstance();

            loadMultipleRootFragment(R.id.fl_tab_container, ConsActions.I_TAB_PAGE_HOME,
                    mFragments[ConsActions.I_TAB_PAGE_HOME],
                    mFragments[ConsActions.I_TAB_PAGE_LEARNNING_CENTER],
                    mFragments[ConsActions.I_TAB_PAGE_BULO_FAMILY],
                    mFragments[ConsActions.I_TAB_PAGE_MINE_CENTER]);
        } else {
            // 这里库已经做了Fragment恢复,所有不需要额外的处理了, 不会出现重叠问题

            // 这里我们需要拿到mFragments的引用
            mFragments[ConsActions.I_TAB_PAGE_HOME] = firstFragment;
            mFragments[ConsActions.I_TAB_PAGE_LEARNNING_CENTER] = LearningCenterFragment.newInstance();
            mFragments[ConsActions.I_TAB_PAGE_BULO_FAMILY] = BuloFamilyFragment.newInstance();
            mFragments[ConsActions.I_TAB_PAGE_MINE_CENTER] = MineCenterFragment.newInstance();

        }
    }

    private void initView(View view) {
        mBottomBar = (BottomBar) view.findViewById(R.id.bottomBar);
        mBottomBar
                .addItem(new BottomBarTab(_mActivity, R.drawable.ic_home_selected, ConsActions.TAB_PAGE_HOME))
                .addItem(new BottomBarTab(_mActivity, R.drawable.ic_learning_selected, ConsActions.TAB_PAGE_LEARNNING_CENTER))
                .addItem(new BottomBarTab(_mActivity, R.drawable.ic_family_selected, ConsActions.TAB_PAGE_BULO_FAMILY))
                .addItem(new BottomBarTab(_mActivity, R.drawable.ic_mine_selected, ConsActions.TAB_PAGE_MINE_CENTER));

        // 模拟未读消息
//        mBottomBar.getItem(I_TAB_PAGE_HOME).setUnreadCount(9);

        mBottomBar.setOnTabSelectedListener(new BottomBar.OnTabSelectedListener() {
            @Override
            public void onTabSelected(int position, int prePosition) {
                EventBusActivityScope.getDefault(_mActivity).post(new TabStatusEvent(position));
                showHideFragment(mFragments[position], mFragments[prePosition]);

//                BottomBarTab tab = mBottomBar.getItem(ConsActions.I_TAB_PAGE_HOME);
//                if (position == ConsActions.I_TAB_PAGE_HOME) {
//                    tab.setUnreadCount(0);
//                } else {
//                    tab.setUnreadCount(tab.getUnreadCount() + 1);
//                }
            }

            @Override
            public void onTabUnselected(int position) {

            }

            @Override
            public void onTabReselected(int position) {
                // 在FirstPagerFragment,FirstHomeFragment中接收, 因为是嵌套的Fragment
                // 主要为了交互: 重选tab 如果列表不在顶部则移动到顶部,如果已经在顶部,则刷新
//                EventBusActivityScope.getDefault(_mActivity).post(new TabSelectedEvent(position));
            }
        });
    }

    @Override
    public void onFragmentResult(int requestCode, int resultCode, Bundle data) {
        super.onFragmentResult(requestCode, resultCode, data);
        if (requestCode == REQ_MSG && resultCode == RESULT_OK) {

        }
    }

    /**
     * start other BrotherFragment
     */
    public void startBrotherFragment(SupportFragment targetFragment) {
        start(targetFragment);
    }
}
