package com.bulu.cn;

import android.os.Bundle;

import com.bulu.cn.fragment.PublicFirstWebViewFragment;
import com.bulu.cn.tool.AppManager;

import me.yokeyword.fragmentation.SupportActivity;
/**
 * @Title:PublicActivityForFragment
 * @Package:cn.com.zhongguancun.PublicActivityForFragment
 * @Description:二级页面的承载Activity类
 * @Auther:YJH
 * @Email:yuannunhua@gmail.com
 * @Date:2018/6/2813:51
 */
public class PublicSecondPageActivity extends SupportActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_public_for_fragment);
        AppManager.getInstance().addActivity(this);

        final String file_url = getIntent().getStringExtra("page_url");
        //加载二级fragment页面
        if (null == findFragment(SplashFragment.class)) {
            loadRootFragment(R.id.fl_container, PublicFirstWebViewFragment.newInstance(file_url));
        }
    }



    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}
