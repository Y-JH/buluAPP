package com.bulu.cn.base;

import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;

import com.bulu.cn.BaseApplication;


/**
 * @Auther: YJH
 * @Package: Bulo-com.buluedu.baselib.base
 * @Created time: 2018/8/14-16:15
 * @description: 权限判断申请逻辑
 */

public class BaseActivity extends AppCompatActivity {
    public String TAG;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }




    /**
     * ---------------安卓的动态权限、在基类中设置，子类中实现------------------
     **/
    public static final int EXTENT_PERMISSION_CODE_CAMERA = 0x01;
    public static final int EXTENT_PERMISSION_CODE_WRITE = 0x02;

    /**
     * 功能：判断是否存在权限的判断
     *
     * @param permissions
     */
    protected boolean hasThePermisson(String... permissions) {
        for (String permission : permissions) {
            int per = ContextCompat.checkSelfPermission(BaseApplication.getsInstance(), permission);
            if (per != PackageManager.PERMISSION_GRANTED) {
                return false;
            }
        }
        return true;
    }

    /**
     * 功能：权限的申请
     *
     * @param requestCode
     * @param permissions
     */
    protected void requestPermission(int requestCode, String... permissions) {
        //说明没有改权限，则要申请哦
        if (Build.VERSION.SDK_INT > 23) {
            ActivityCompat.requestPermissions(this, permissions, requestCode);
        }
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        switch (requestCode) {
            case EXTENT_PERMISSION_CODE_WRITE:
                boolean write_ok = grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED;
                if (write_ok) {
                    doPermissionWriteGranted();
                }else{
                    doPermissionWriteDenied();
                }
                break;


            case EXTENT_PERMISSION_CODE_CAMERA:
                boolean camera_ok = grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED;
                if (camera_ok) {
                    doPermissionCameraGranted();
                }else{
                    doPermissionCameraDenied();

                }
                break;
        }

    }


    public void doPermissionCameraDenied() {

    }

    public void doPermissionCameraGranted() {

    }

    public void doPermissionWriteDenied() {

    }

    public void doPermissionWriteGranted() {

    }
}
