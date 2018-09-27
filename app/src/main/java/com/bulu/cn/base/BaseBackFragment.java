package com.bulu.cn.base;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.Toolbar;
import android.view.View;

import com.bulu.cn.R;

import me.yokeyword.fragmentation_swipeback.SwipeBackFragment;

/**
 * @Auther: YJH
 * @Package: Bulo-com.buluedu.baselib.base
 * @Created time: 2018/8/14-16:58
 * @description: 描述..
 */
public class BaseBackFragment extends SwipeBackFragment {

    private static final String TAG = "BaseBackFragment";

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        setParallaxOffset(0.5f);
    }

    protected void initToolbarNav(Toolbar toolbar) {
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_black_24dp);
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                _mActivity.onBackPressed();
            }
        });
    }
}
