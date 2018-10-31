package com.bulu.cn;

import android.content.Intent;
import android.os.Bundle;

import com.bulu.cn.event.IAndroidFirstPageEvent;
import com.bulu.cn.fragment.PublicFirstWebViewFragment;
import com.bulu.cn.tool.AppManager;
import com.luck.picture.lib.PictureSelector;
import com.luck.picture.lib.config.PictureConfig;
import com.luck.picture.lib.entity.LocalMedia;
import com.orhanobut.logger.Logger;

import me.yokeyword.eventbusactivityscope.EventBusActivityScope;
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

    /**
     * 返回图片地址："/storage/emulated/0/huawei/MagazineUnlock/magazine-unlock-hi1423703.jpg"
     * @param requestCode
     * @param resultCode
     * @param data
     */
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK) {
            switch (requestCode) {
                case PictureConfig.CHOOSE_REQUEST:
                    // 图片选择结果回调
                    // 例如 LocalMedia 里面返回三种path
                    // 1.media.getPath(); 为原图path
                    // 2.media.getCutPath();为裁剪后path，需判断media.isCut();是否为true
                    // 3.media.getCompressPath();为压缩后path，需判断media.isCompressed();是否为true
                    // 如果裁剪并压缩了，已取压缩路径为准，因为是先裁剪后压缩的
                    for (LocalMedia media : PictureSelector.obtainMultipleResult(data)) {
                        Logger.e("===========发送==============22>>>" + media.getPath());
                        EventBusActivityScope.getDefault(PublicSecondPageActivity.this)
                                .post(new IAndroidFirstPageEvent.SelctAvatarNotify(media.getPath()));
                    }
//                    adapter.setList(selectList);
//                    adapter.notifyDataSetChanged();
                    break;
            }
        }
    }
}
