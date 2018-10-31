package com.bulu.cn.fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.bulu.cn.BaseApplication;
import com.bulu.cn.R;
import com.bulu.cn.agent.IAndroidCallbackFirstAgent;
import com.bulu.cn.agent.WebAgentFragmentImpl;
import com.bulu.cn.base.BaseBackFragment;
import com.bulu.cn.constant.ConsActions;
import com.bulu.cn.event.IAndroidFirstPageEvent;
import com.bulu.cn.event.IAndroidShareSDKEvent;
import com.bulu.cn.share.ShareDialog;
import com.bulu.cn.tool.AppManager;
import com.bulu.cn.tool.SharedPreferencesHelper;
import com.bulu.cn.xutils.AvatarResponse;
import com.bulu.cn.xutils.ICommonUploadFileListener;
import com.bulu.cn.xutils.XUtils3;
import com.just.agentweb.AgentWeb;
import com.luck.picture.lib.PictureSelector;
import com.luck.picture.lib.config.PictureConfig;
import com.luck.picture.lib.config.PictureMimeType;
import com.luck.picture.lib.entity.LocalMedia;

import org.greenrobot.eventbus.Subscribe;

import java.util.ArrayList;
import java.util.List;

import me.yokeyword.eventbusactivityscope.EventBusActivityScope;
import me.yokeyword.fragmentation.SupportFragment;

import static com.bulu.cn.share.ShareDialog.SHARE_IMAGE;

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
    private List<LocalMedia> selectList = new ArrayList<>();

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
     *
     * @param event
     */
    @Subscribe
    public void showAndroidNewFirstPage(IAndroidFirstPageEvent.NewPage event) {
        if (ConsActions.NEW_PAGE_EVENT.equals(event.NEW_PAGE_EVENT)) {
            startBrotherFragment(PublicSecondWebViewFragment.newInstance(event.pageUrl));
        }
    }

    @Subscribe
    public void shareWithSDK(IAndroidShareSDKEvent.ShareWithSDK event) {
//        Toast.makeText(getActivity(), "点击分享", Toast.LENGTH_SHORT).show();
        if (ConsActions.SAHRE_SDK_EVENT.equals(event.SAHRE_SDK_EVENT)) {
            //第三方分享功能
//            final String photo = "http://img.mukewang.com/5465af0c0001bb6706000338-590-330.jpg";
            final String photo = "https://github.com/Y-JH/buluAPP/blob/20180927/app/src/main/res/drawable/wel_1.png";
            new ShareDialog.Builder()
                    .setmShareType(SHARE_IMAGE)
                    .setmShareText("百万大奖等你拿")
                    .setmSharePhoto(photo)
                    .build(getActivity()).show();
        }
    }

    /**
     * 功能：eventbus 接收消息修改状态栏
     *
     * @param event
     */
    @Subscribe
    public void closeAndroidFirstPage(IAndroidFirstPageEvent.ClosePage event) {
        if (ConsActions.CLOSE_PAGE_EVENT.equals(event.CLOSE_PAGE_EVENT)) {
//            getActivity().finish();
            AppManager.getInstance().finishAllActivity();
        }
    }


    /**
     * 功能：
     *
     * @param event
     */
    @Subscribe
    public void selctAvatarNotify(IAndroidFirstPageEvent.SelctAvatarNotify event) {
        if (ConsActions.SELECT_AVATAR_NOTIFY_EVENT.equals(event.SELECT_AVATAR_NOTIFY_EVENT)) {
            String picUrl = event.picUrl;
            String cid = (String) SharedPreferencesHelper.getSharedPreferences(BaseApplication.getsInstance(), "cid", "");
//            Toast.makeText(getActivity(), cid+"=="+picUrl, Toast.LENGTH_SHORT).show();
            new XUtils3.Builder()
                    .addBodyFileParameter(picUrl)
                    .addBodyStrParameter(cid)
                    .build().uploadAvatar(new ICommonUploadFileListener<AvatarResponse>() {
                @Override
                public void onSuccess(AvatarResponse avatarResponse) {
//                    Logger.e("上传头像成功="+avatarResponse);
                    mWebAgent.getAgentWeb().getJsAccessEntrace().quickCallJs("selectAvatar");
                }
            });

        }
    }


    /**
     * 选择头像
     **/
    @Subscribe
    public void onSelectAvatar(IAndroidFirstPageEvent.SelctAvatar event) {
        if (ConsActions.SELECT_AVATAR_EVENT.equals(event.SELECT_AVATAR_EVENT)) {
            PictureSelector.create(getActivity())
                    .openGallery(PictureMimeType.ofImage())// 单独拍照，也可录像或也可音频 看你传入的类型是图片or视频
//                    .theme(themeId)// 主题样式设置 具体参考 values/styles
                    .maxSelectNum(1)// 最大图片选择数量
                    .minSelectNum(1)// 最小选择数量
                    .selectionMode(PictureConfig.SINGLE)// 多选 or 单选
                    .previewImage(true)// 是否可预览图片
                    .isCamera(true)// 是否显示拍照按钮
                    .enableCrop(true)// 是否裁剪
                    .compress(true)// 是否压缩
                    .glideOverride(160, 160)// glide 加载宽高，越小图片列表越流畅，但会影响列表图片浏览的清晰度
                    .withAspectRatio(1, 1)// 裁剪比例 如16:9 3:2 3:4 1:1 可自定义
//                    .hideBottomControls(cb_hide.isChecked() ? false : true)// 是否显示uCrop工具栏，默认不显示
                    .isGif(false)// 是否显示gif图片
                    .freeStyleCropEnabled(false)// 裁剪框是否可拖拽
                    .circleDimmedLayer(true)// 是否圆形裁剪
                    .showCropFrame(false)// 是否显示裁剪矩形边框 圆形裁剪时建议设为false
                    .showCropGrid(false)// 是否显示裁剪矩形网格 圆形裁剪时建议设为false
                    .openClickSound(true)// 是否开启点击声音
                    .selectionMedia(selectList)// 是否传入已选图片
                    .previewEggs(false)//预览图片时 是否增强左右滑动图片体验(图片滑动一半即可看到上一张是否选中)
                    //.previewEggs(false)// 预览图片时 是否增强左右滑动图片体验(图片滑动一半即可看到上一张是否选中)
                    //.cropCompressQuality(90)// 裁剪压缩质量 默认为100
                    .minimumCompressSize(100)// 小于100kb的图片不压缩
                    //.cropWH()// 裁剪宽高比，设置如果大于图片本身宽高则无效
                    //.rotateEnabled() // 裁剪是否可旋转图片
                    //.scaleEnabled()// 裁剪是否可放大缩小图片
                    //.videoQuality()// 视频录制质量 0 or 1
                    //.videoSecond()////显示多少秒以内的视频or音频也可适用
                    .forResult(PictureConfig.CHOOSE_REQUEST);//结果回调onActivityResult code
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
