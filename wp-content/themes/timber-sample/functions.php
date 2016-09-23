<?php

	if ( ! class_exists( 'Timber' ) ) {
		add_action( 'admin_notices', function() {
				echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
			} );
		return;
	}

	Timber::$dirname = array('templates', 'views');

	class StarterSite extends TimberSite {

		function __construct() {
			add_theme_support( 'post-formats' );
			add_theme_support( 'post-thumbnails' );
			add_theme_support( 'menus' );
			add_filter( 'timber_context', array( $this, 'add_to_context' ) );
			add_filter( 'get_twig', array( $this, 'add_to_twig' ) );

			parent::__construct();
		}

		function add_to_context( $context ) {
			$context['menu'] = new TimberMenu('header');
			$context['footer'] = new TimberMenu("footer");
			$context['site'] = $this;
			$context['options'] = get_fields('options');
			// print_r($context['menu']);
			return $context;
		}

		function add_to_twig( $twig ) {
			/* this is where you can add your own fuctions to twig */
			$twig->addExtension( new Twig_Extension_StringLoader() );
			$twig->addFilter( 'languages_list_footer', new Twig_Filter_Function( 'languages_list_footer' ) );
			return $twig;
		}



	}

	new StarterSite();

	register_nav_menus( array(
		'primary' => 'Primary',
	) );

	// If you wish to remove menus from the admin interface
	show_admin_bar( false );
	function remove_menus()
	{
	    global $menu;
	    global $current_user;
	    get_currentuserinfo();
	        $restricted = array(
															// __('Posts'),
	                            // __('Media'),
	                            __('Links'),
	                            __('Comments'),
	                            // __('Appearance'),
	                            // __('Plugins'),
	                            // __('Users'),

	                            // __('Tools'),
	                            // __('Settings')
	        );
	        end ($menu);
	        while (prev($menu)){
	            $value = explode(' ',$menu[key($menu)][0]);
	            if(in_array($value[0] != NULL?$value[0]:"" , $restricted)){unset($menu[key($menu)]);}
	        }// end while

	}
	add_action('admin_menu', 'remove_menus');

	// Support for SVGS
	function cc_mime_types($mimes) {
	  $mimes['svg'] = 'image/svg+xml';
	  return $mimes;
	}
	add_filter('upload_mimes', 'cc_mime_types');

	// Add Options Page
	if( function_exists('acf_add_options_page') ) {
		acf_add_options_page('Site Settings');
	}


	// Keeps track of post views, which allows for some interesting sorting on the frontend
	function wpb_set_post_views($postID) {
	    $count_key = 'wpb_post_views_count';
	    $count = get_post_meta($postID, $count_key, true);
	    if($count==''){
	        $count = 0;
	        delete_post_meta($postID, $count_key);
	        add_post_meta($postID, $count_key, '0');
	    }else{
	        $count++;
	        update_post_meta($postID, $count_key, $count);
	    }
	}

	if( !is_admin()){
		wp_deregister_script('jquery');
	}


	//To keep the count accurate, lets get rid of prefetching
	remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
